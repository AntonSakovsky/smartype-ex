import { FC } from 'react';
import s from './UserLevel.module.css';

interface IUserLevelItemProps {
    num: number,
    symb: string,
    count: number,
    time: string,
    speed: number,
    accuracy: number,
}

export const UserLevelItem: FC<IUserLevelItemProps> = ({num, symb, count, time, speed, accuracy}) => {
   

    return (
        <div className={s.profileLevelsItem}>
            <div className={s.profileLevelName}>Уровень {num}({symb})</div>
            <div className={s.levelStatsWrap}>
                <div className={s.profileLevelCount + ' ' + s.stat}>Кол-во: <span>{count}</span> р</div>
                <div className={s.profileLevelTime + ' ' + s.stat}>
                    <i className="fa-regular fa-clock"></i>
                    <span>{time}</span>
                </div>
                <div className={s.profileLevelSpeed + ' ' + s.stat}>
                    <i className="fa-regular fa-gauge-high"></i>
                    <span>{speed}</span> зн/мин
                </div>
                <div className={s.profileLevelAccuracy + ' ' + s.stat}>
                    <i className="fa-regular fa-bullseye"></i>
                    <span>{accuracy}</span>%
                </div>
            </div>
        </div>
    )

}