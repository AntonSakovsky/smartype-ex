import { FC } from "react";
import { NavLink } from "react-router-dom";
import s from './LevelResult.module.css';

interface ILevelResultProps {
    time: string,
    mistakes: number,
    speed: number,
    accuracy: number,
    handleClick: ()=>void,
}

export const LevelResult: FC<ILevelResultProps> = ({ speed, time, accuracy, mistakes, handleClick }) => {
   const againBtn = ()=>{
    // handdle
   }
    return (
        <>
            <div className={s.overlay}></div>
            <div className={s['level-end-container']}>
                <h2 className={s['level-end-title']}>Упражнение завершено!</h2>
                <div className={s.results}>
                    {/* results__stats-time */}
                    <div className={s['results-stat']}>
                        <span>{time}</span> мин
                    </div>
                    {/* results__stats-misses */}
                    <div className={s['results-stat']}>
                        <span>{mistakes}</span> ошибок
                    </div>
                    {/* results__stats-speed */}
                    <div className={s['results-stat']}>
                        <span>{speed}</span> зн/мин
                    </div>
                    {/* results__stats-accuracy */}
                    <div className={s['results-stat']}>
                        <span>{accuracy}%</span> точность
                    </div>
                </div>
                <div className={s.buttons}>
                    <button className={s['again-btn']} onClick={handleClick}>Ещё раз</button>
                    <NavLink to="/" className={s['exit-btn']}>Выйти</NavLink>
                </div>
            </div>
        </>
    )
}