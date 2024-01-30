import { FC, useCallback, useEffect, useRef, useState } from 'react';
import s from "./SingleLevel.module.css";
import { KeyboardContainer } from './KeyboardContainer/KeyboardContainer';
import { Navbar } from '../Navbar/Navbar';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux-hooks';
import { fetchLevelText, fetchPracticeText, resetLevelData, setCount, setLevelId, setSymbols, setTextToWrite, setWrittenText, updateUserLevels, updateUserPractice, updateUserProgress } from '../../store/reducers/SingleLevelSclice';
import { STORAGE_LEVEL_COUNT, STORAGE_LEVEL_ID, STORAGE_LEVEL_SYMBOLS, insignificantKeys } from '../../models/constants/constants';
import { Pacman } from './Pacman/Pacman';
import { LevelResult } from './LevelResult/LevelResult';
import { Loader } from '../Loader/Loader';
import { ILevels, IPractice } from '../../models/types';
import { SmallScreenWarning } from '../SmallScreenWarning/SmallScreenWarning';

type UpdateUserLevelsType = Omit<ILevels, 'count' | 'symb' | 'id'>

interface ISingleLevel { }

export const SingleLevel: FC<ISingleLevel> = ({ }) => {
    const dispatch = useAppDispatch();
    const { isLoading, textToWrite, delta, writtenText, symbols, lang, short, lvlId, count } = useAppSelector(state => state.singleLevel);
    const layoutLang = useAppSelector(state => state.levelsPage.layoutLang);

    const totalSymbols = useRef<number>(0);
    const totalSeconds = useRef<number>(0);
    const [currSpeed, setCurrSpeed] = useState<number>(0);
    const [currAccuracy, setCurrAccuracy] = useState<number>(100);
    const totalSecondsTimerId = useRef<NodeJS.Timeout | null>(null);
    const speedTimerId = useRef<NodeJS.Timeout | null>(null);
    const firstTouch = useRef<boolean>(true);
    const canCalcSpeed = useRef<boolean>(false);
    const canCalcAccuracy = useRef<boolean>(true);
    const [time, setTime] = useState<string>('00:00');
    const [mistakes, setMistakes] = useState<number>(0);
    const [isMistake, setIsMistake] = useState<boolean>(false);
    const [eating, setEating] = useState<boolean>(false);
    const myDelta = useRef<number>(delta);
    const [finished, setFinished] = useState<boolean>(false);
    const [imgVisible, setImgVisible] = useState<boolean>(true);
    const [keyToLight, setKeyToLight] = useState<string>('');
    const [pressedKey, setPressedKey] = useState<string>('');

    const updateDB = useRef(() => {
        updateUserDB();
    });

    useEffect(() => {
        // обновление замыкания
        updateDB.current = () => {
            updateUserDB();
        };
    }, [currSpeed, currAccuracy]);

    const updateUserDB = async () => {
        if (short === '') {
            const data: UpdateUserLevelsType = {
                accuracy: currAccuracy,
                speed: currSpeed,
                time: time,
            }
            dispatch(updateUserLevels(data));
            dispatch(updateUserProgress(data));
        } else {
            const data: IPractice = {
                accuracy: currAccuracy,
                lang: lang,
                short: short,
                speed: currSpeed,
                time: time,
            }
            dispatch(updateUserPractice(data));
        }
    };


    const eatLetter = (key: string) => {
        if (key !== ' ') {
            setEating(true);
            setTimeout(() => {
                setEating(false);
            }, 100);
        }
        dispatch(setTextToWrite(textToWrite.slice(1)));
        dispatch(setWrittenText(writtenText + key));
    };

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
        const minutes = totalSeconds.current / 60;
        const speed = minutes === 0 ? 0 : Math.round(totalSymbols.current / minutes);
        setCurrSpeed(speed);
        const newTimerId = setTimeout(calculateSpeed, 800);
        speedTimerId.current = newTimerId;
    }
    const calculateAccuracy = () => {
        if (canCalcAccuracy.current) {
            setMistakes(prev => prev + 1);
            setCurrAccuracy(prev => +(prev - myDelta.current).toFixed(2));
            canCalcAccuracy.current = false;
        }
    };

    const calculateSeconds = () => {
        if (totalSecondsTimerId.current) {
            clearTimeout(totalSecondsTimerId.current);
            totalSecondsTimerId.current = null;
        }
        totalSeconds.current++;
        setTime(getCorrectTime(totalSeconds.current));
        const newTimerId = setTimeout(calculateSeconds, 1000);
        totalSecondsTimerId.current = newTimerId;
    }

    const getCorrectTime = (totalSeconds: number): string => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const strMinutes = minutes > 9 ? `${minutes}` : `0${minutes}`;
        const strSeconds = seconds > 9 ? `${seconds}` : `0${seconds}`;
        return `${strMinutes}:${strSeconds}`;
    }


    const writeText = (e: KeyboardEvent) => {
        e.preventDefault();
        if (textToWrite.length === 0) return;
        const key = e.key;
        setPressedKey(key);
        if (!insignificantKeys.has(key)) {
            setImgVisible(false);
            // document.querySelector('.hands').style.display = 'none';
            if (firstTouch.current) {
                firstTouch.current = false;
                setTimeout(() => {
                    calculateSeconds();
                    canCalcSpeed.current = true;
                }, 1000);
            }
            if (key === textToWrite[0]) {
                setIsMistake(false);
                eatLetter(key);
                canCalcAccuracy.current = true;
                if (canCalcSpeed.current) {
                    calculateSpeed();
                    canCalcSpeed.current = false;
                }
                if (textToWrite.length === 1) {
                    stopTimers();
                    setTimeout(()=>{
                        updateDB.current();
                        setFinished(true);
                    },150);
                    
                } else {
                    setKeyToLight(textToWrite[1])
                }
                totalSymbols.current++;
            } else {
                setIsMistake(true);
                calculateAccuracy()
            }
        }
    };

    const restart = useCallback(() => {
        setCurrAccuracy(100);
        setCurrSpeed(0);
        setMistakes(0);
        setEating(false);
        setFinished(false);
        setTime("00:00");
        setKeyToLight('');
        setPressedKey('');
        setImgVisible(true);
        totalSymbols.current = 0;
        totalSeconds.current = 0;
        firstTouch.current = true;
        canCalcSpeed.current = false;
        canCalcAccuracy.current = false;

        localStorage.setItem(STORAGE_LEVEL_COUNT, String(count+1));
        dispatch(setWrittenText(''));
        dispatch(setCount(count+1))
        if (!short) {
            dispatch(fetchLevelText({ lang: layoutLang, symbols }));//en, ru

        } else {
            dispatch(fetchPracticeText({ lang }))//js, c#...
        }
    }, [symbols]);

    useEffect(() => {
        myDelta.current = delta;
    }, [delta]);

    useEffect(() => {
      
        document.body.style.backgroundColor = 'var(--bg-body-blue)';
        if (!short) {
            let symb = '';
            if (symbols === '') {
                symb = localStorage.getItem(STORAGE_LEVEL_SYMBOLS) as string;
                dispatch(setSymbols(symb));
                dispatch(fetchLevelText({ lang: layoutLang, symbols: symb }));//en, ru
            } else {
                dispatch(fetchLevelText({ lang: layoutLang, symbols }));//en, ru
            }
        } else {
            dispatch(fetchPracticeText({ lang }))//js, c#...
        }
        const lvlCount = localStorage.getItem(STORAGE_LEVEL_COUNT);
        if(lvlCount){
            if(count !== +lvlCount){
                dispatch(setCount(+lvlCount));
            }
        }
        const id = localStorage.getItem(STORAGE_LEVEL_ID);
        if(id){
            if(lvlId !== +id){
                dispatch(setLevelId(+id));
            }
        }
        const keyUpHandler = () => {
            setPressedKey('');
        }
        window.addEventListener('keyup', keyUpHandler);
        return () => {
            stopTimers();
            dispatch(resetLevelData());
            window.removeEventListener('keyup', keyUpHandler);
        }
    }, []);


    useEffect(() => {
        window.addEventListener('keydown', writeText);
        if (textToWrite !== '' && keyToLight === '') {
            setKeyToLight(textToWrite[0]);
        }
        return () => {
            window.removeEventListener('keydown', writeText);
        }
    }, [textToWrite])


    return (
        <>
            <Navbar />
            {
                finished ? <LevelResult
                    accuracy={currAccuracy}
                    mistakes={mistakes}
                    speed={currSpeed}
                    time={time}
                    handleClick={restart} />
                    :
                    <>
                        <div className="container">
                            <div className={s.timeBlock}>
                                <span>{time}</span>
                            </div>

                            <div className={s.stats}>
                                <div className={s.statsMisses}>
                                    <span>{mistakes}</span> ошибок
                                </div>
                                <div className={s.statsSpeed}>
                                    <span>{currSpeed}</span> зн/мин
                                </div>
                                <div className={s.statsAccuracy}>
                                    <span>{currAccuracy}%</span> точность
                                </div>
                            </div>

                            <div className={s.levelText}>
                                <div className={s.levelTextWrap}>
                                    <div className={s.textInvisible}>
                                        <div className={s.writtenText}>
                                            {writtenText}
                                        </div>
                                        <Pacman red={isMistake} eating={eating} />
                                    </div>
                                    <div className={s.textVisible} >
                                        {
                                            isLoading ?
                                                <Loader height={50} width={50} strokeWidth={5} style={{ margin: 'auto' }} />
                                                :
                                                textToWrite
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                        <KeyboardContainer imgVisible={imgVisible} keyToLight={keyToLight} pressedKey={pressedKey} />

                        <SmallScreenWarning />
                    </>
            }
        </>
    )
}