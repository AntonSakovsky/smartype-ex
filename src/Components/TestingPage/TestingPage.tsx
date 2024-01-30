import React, { RefObject, useCallback, useEffect, useRef, useState } from "react";
import s from './TestingPage.module.css';
import { Navbar } from "../Navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { fetchTestText, getBestResults, setLang, updateTestRecord, updateUserRating, updateUserTests } from "../../store/reducers/TestSclice";
import { TestingPanel } from "./TestingPanel/TestingPanel";
import { SelectTestLanguage } from "./SelectTestLanguage/SelectTestLanguage";
import { insignificantKeys } from "../../models/constants/constants";
import { TestingResult } from "./TestingResult/TestingResult";
import { ITest } from "../../models/types";
import { SmallScreenWarning } from "../SmallScreenWarning/SmallScreenWarning";

interface ITestingPage { }

export const TestingPage: React.FC<ITestingPage> = () => {
    const totalSymbols = useRef<number>(0);
    const totalSeconds = useRef<number>(0);
    const [currSpeed, setCurrSpeed] = useState<number>(0);
    const [currAccuracy, setCurrAccuracy] = useState<number>(100);
    const totalSecondsTimerId = useRef<NodeJS.Timeout | null>(null);
    const speedTimerId = useRef<NodeJS.Timeout | null>(null);
    const firstTouch = useRef<boolean>(true);
    const canCalcSpeed = useRef<boolean>(false);
    const canCalcAccuracy = useRef<boolean>(true);
    const [finished, setFinished] = useState<boolean>(false);

    const updateDB = useRef(() => {
        updateUserDB(currSpeed, currAccuracy);
        updateRating(currSpeed, currAccuracy);
        updateRecord(currSpeed, currAccuracy);
    });

    useEffect(() => {
        // обновление замыкания
        updateDB.current = () => {
            updateUserDB(currSpeed, currAccuracy);
            updateRating(currSpeed, currAccuracy);
            updateRecord(currSpeed, currAccuracy);
        };
    }, [currSpeed, currAccuracy]);


    const dispatch = useAppDispatch();
    const { isLoading, text, lang, delta, bestSpeed, bestAccuracy } = useAppSelector(state => state.testing);
    const myDelta = useRef<number>(delta);
    const { uid, name } = useAppSelector(state => state.user);

    const calculateSeconds = () => {
        if (totalSecondsTimerId.current) {
            clearTimeout(totalSecondsTimerId.current);
            totalSecondsTimerId.current = null;
        }
        totalSeconds.current++;
        const newTimerId = setTimeout(calculateSeconds, 1000);
        totalSecondsTimerId.current = newTimerId;
    }
    const stopTimers = () => {
        if (totalSecondsTimerId.current) {
            clearTimeout(totalSecondsTimerId.current);
            totalSecondsTimerId.current = null;
        }
        if (speedTimerId.current) {
            clearTimeout(speedTimerId.current);
            speedTimerId.current = null;
        }
    }
    const calculateSpeed = () => {
        if (speedTimerId.current) {
            clearTimeout(speedTimerId.current);
            speedTimerId.current = null;
        }
        console.log('speed');
        const minutes = totalSeconds.current / 60;
        const speed = minutes === 0 ? 0 : Math.round(totalSymbols.current / minutes);
        setCurrSpeed(speed);
        const newTimerId = setTimeout(calculateSpeed, 1000);
        speedTimerId.current = newTimerId;
    }
    const calculateAccuracy = useCallback(() => {
        if (canCalcAccuracy.current) {
            setCurrAccuracy(prev => +(prev - myDelta.current).toFixed(2));
            canCalcAccuracy.current = false;
        }
    }, [delta]);

    const addGreen = (ind: number, ref: RefObject<Element>) => {
        const span = ref.current?.querySelector(`span[data-num="${ind}"]`);
        if (span) {
            span.classList.add(s.tgreen);
        }
    }
    const addRed = (ind: number, ref: RefObject<Element>) => {
        const span = ref.current?.querySelector(`span[data-num="${ind}"]`);
        if (span) {
            span.classList.add(s.tred);
            span.classList.remove(s.tgreen);
        }
    }
    const passText = (ind: number, ref: RefObject<Element>) => {
        const span = ref.current?.querySelector(`span[data-num="${ind}"]`);
        if (span) {
            span.classList.add(s.passedText);
            span.classList.remove(s.tgreen);
            span.classList.remove(s.tred);
            addGreen(ind + 1, ref);
            canCalcAccuracy.current = true;
        }
    }

    const writeText = useCallback((key: string, ref: RefObject<Element>) => {
        if (ref.current?.querySelectorAll('span').length === totalSymbols.current) return;
        if (!insignificantKeys.has(key)) {
            if (firstTouch.current) {
                firstTouch.current = false;
                setTimeout(() => {
                    calculateSeconds();
                    canCalcSpeed.current = true;
                }, 500);
            }
            const currLetter = ref.current?.querySelector(`span[data-num="${totalSymbols.current + 1}"]`)?.textContent;
            if (key === currLetter) {
                passText(totalSymbols.current + 1, ref);
                if (canCalcSpeed.current) {
                    calculateSpeed();
                    canCalcSpeed.current = false;
                }
                if (ref.current?.querySelectorAll('span').length === totalSymbols.current + 1) {
                    stopTimers();

                    setTimeout(() => {
                        updateDB.current();
                        setFinished(true);
                    }, 100);

                }
                totalSymbols.current++;
            } else {
                addRed(totalSymbols.current + 1, ref);
                calculateAccuracy();
            }
        }
    }, [currSpeed, currAccuracy]);


    const dispatchLanguage = (lang: string) => {
        dispatch(setLang(lang));
    }

    const updateUserDB = async (currSpeed: number, currAccuracy: number) => {
        const date = new Date();
        const dateString = `${String(date.getDate()).length === 1 ? ('0' + date.getDate()) : date.getDate()}.${(String(date.getMonth() + 1)).length === 1 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1}.${date.getFullYear()}`
        const data: ITest = {
            accuracy: currAccuracy,
            date: dateString,
            speed: currSpeed,
        }
        dispatch(updateUserTests(data));
    };

    const updateRating = async (currSpeed: number, currAccuracy: number) => {
        const date = new Date();
        const dateString = `${String(date.getDate()).length === 1 ? ('0' + date.getDate()) : date.getDate()}.${(String(date.getMonth() + 1)).length === 1 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1}.${date.getFullYear()}`
        const data: ITest = {
            speed: currSpeed,
            accuracy: currAccuracy,
            date: dateString,
        }
        dispatch(updateUserRating(data));
    };

    const updateRecord = (currSpeed: number, currAccuracy: number) => {
        dispatch(updateTestRecord({ accuracy: currAccuracy, speed: currSpeed, uid: String(uid) }))
    };

    useEffect(() => {
        document.body.style.backgroundColor = 'var(--bg-body-blue)';
        dispatch(getBestResults({ uid: String(uid) }));
        return () => {
            stopTimers();
        };
    }, [])

    useEffect(() => {
        myDelta.current = delta;
    }, [delta]);

    const init = () => {
        stopTimers();
        setCurrSpeed(0);
        setCurrAccuracy(100);
        setFinished(false);
        totalSeconds.current = 0;
        totalSymbols.current = 0;
        canCalcSpeed.current = false;
        canCalcAccuracy.current = true;
        firstTouch.current = true;
        dispatch(fetchTestText({ lang }));
        dispatch(getBestResults({ uid: String(uid) }));
    }

    useEffect(() => {
        init();
    }, [lang]);

    return (
        <>
            <Navbar />
            {
                finished ? <TestingResult
                    accuracy={currAccuracy}
                    accuracyRecord={bestAccuracy}
                    speed={currSpeed}
                    speedRecord={bestSpeed}
                    handleClick={init} />
                    :
                    <div className='container'>
                        <div className={s.testingPageContainer}>
                            <SelectTestLanguage action={dispatchLanguage} />
                            <TestingPanel
                                accuracy={currAccuracy}
                                speed={currSpeed}
                                isLoading={isLoading}
                                text={text}
                                handle={writeText}
                                restart={init} />
                        </div>

                    </div>

            }
            <SmallScreenWarning />
        </>

    )
}