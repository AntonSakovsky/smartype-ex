import { FC } from "react";
import { NavLink } from "react-router-dom";
import s from './TestingResult.module.css';

interface ITestingResultProps {
    speed: number,
    speedRecord: number,
    accuracy: number,
    accuracyRecord: number,
    handleClick: ()=> void,
 }

export const TestingResult: FC<ITestingResultProps> = ({accuracy, accuracyRecord, speed, speedRecord, handleClick}) => {
    return (
        <div className={'test-end-container'}>
            <div className={s['test-end-wrap']}>
                <h1 className={s['test-end-title']}>Поздравляем</h1>
                <div className={s['test-results-wrap']}>
                    <div className={s['test-speed-res']}>
                        <div className={s['test-res-title']}>
                            <i className="fa-regular fa-gauge-high"></i>
                            <span>Скорость</span>
                        </div>
                        <div className={s['test-speed']}>
                            <span>{speed}</span>зн/мин
                        </div>
                        <div className={s['test-speed-record']}>Твой рекорд <span>{speedRecord}</span></div>
                    </div>
                    <div className={s['test-accuracy-res']}>
                        <div className={s['test-res-title']}>
                            <i className="fa-regular fa-bullseye"></i>
                            <span>Точность</span>
                        </div>
                        <div className={s['test-accuracy']}>
                            <span>{accuracy}</span>%
                        </div>
                        <div className={s['test-accuracy-record']}>Твой рекорд <span>{accuracyRecord}</span></div>
                    </div>
                </div>
                <p className={s['test-description']}>
                    Но ты можешь научиться печатать быстрее.
                </p>
                <p className={s['test-description']}>
                    <NavLink to='/'>Пройди уроки</NavLink> на нашем тренажере.
                </p>
                <button className={s['try-again-btn']} onClick={handleClick}>Ёще раз</button>
            </div>
        </div>
    )
}