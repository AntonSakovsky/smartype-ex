import React, { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import s from '../TestingPage.module.css';
import { Loader } from '../../Loader/Loader';

interface ITestingPanelProps {
    speed: number,
    accuracy: number,
    text: string,
    isLoading: boolean,
    handle: (key: string, ref: RefObject<Element>) => void,
    restart: () => void,
}

export const TestingPanel: React.FC<ITestingPanelProps> = ({ speed, accuracy, text, isLoading, handle, restart }) => {
    const testText = useRef<HTMLDivElement>(null);
    const [renderedText, setRenderedText] = useState<ReactNode>(null);

    const renderText = (text: string): React.ReactNode => {
        const htmlElements: ReactNode[] = [];
        const words = text.split(' ');
        let num = 1;
        let key = 1
        for (let i = 0; i < words.length; i++) {
            const spanArr: React.ReactNode[] = [];
            for (let j = 0; j < words[i].length + 1; j++) {
                let className = '';
                let textContent = '';
                if (num <= text.length) {
                    if (i === 0 && j === 0) {
                        className = s.tgreen;
                    }
                    if (j === words[i].length && i !== words.length - 1) {
                        textContent = ' ';

                    } else {
                        textContent = words[i][j];
                    }
                    spanArr.push(<span className={className} key={num} data-num={num}>{textContent}</span>);
                    num++;
                }
            }
            htmlElements.push(<div key={key}>{spanArr.map(s => s)}</div>);
            key++;
        }
        return htmlElements;
    }

    useEffect(() => {
        const keyDownHandle = (e: KeyboardEvent) => {
            handle(e.key, testText);
        }
        window.addEventListener('keydown', keyDownHandle);
        return () => {
            window.removeEventListener('keydown', keyDownHandle);
        };
    }, [])

    useEffect(() => {
        setRenderedText(renderText(text));
    }, [text]);

    return (
        <section className={s.testing}>
            <div className={s.testWrap}>
                <div className={s.testText} ref={testText}>
                    {
                        isLoading ?
                            <Loader width={100} height={100} style={{ margin: 'auto' }} strokeWidth={5} />
                            :
                            renderedText
                    }
                </div>
                <div className={s.rightSide}>
                    <div className={s.statistics}>
                        <div className={s.characteristic}>
                            <div className={s.characteristicHeader}>
                                <i className="fa-regular fa-gauge-high"></i>
                                <div className={s.characteristicTitle}>Скорость</div>
                            </div>
                            <div className={s.characteristicRes}>
                                <span className='js-speed-res'>{speed}</span>зн/мин
                            </div>
                        </div>

                        <div className={s.characteristic}>
                            <div className={s.characteristicHeader}>
                                <i className="fa-regular fa-bullseye"></i>
                                <div className={s.characteristicTitle}>Точность</div>
                            </div>
                            <div className={s.characteristicRes}>
                                <span className='js-accuracy-res'>{accuracy.toFixed(2)}</span>%
                            </div>
                        </div>
                    </div>
                    <div className={s.restartWrap} onClick={restart}>
                        <a className={s.restart}>Заново</a>
                    </div>

                </div>
            </div>
        </section>
    )
}