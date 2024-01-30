import { FC } from 'react';
import s from './UserTest.module.css';

interface IUserTestItem {
    num: number,
    date: string,
    speed: number
    accuracy: number,
}

export const UserTestItem: FC<IUserTestItem> = ({accuracy, date, num, speed})=> {
    
    return(
        <div className={s.profileTestsItem}>
            <div className={s.userTestInfo}>
                <div className={s.profileTestNumber}>{num}.</div>
                <div className={"profile-test-date"}>{date}</div>
            </div>                    
            <div className={s.statsWrap}>
                
                <div className={s.profileTestSpeed + ' ' + s.stat}>
                    <i className="fa-regular fa-gauge-high"></i>
                    <span>{speed}</span> зн/мин
                </div>
                <div className= {s.profileTestAccuracy + ' ' + s.stat}>
                    <i className="fa-regular fa-bullseye"></i>
                    <span>{accuracy}</span>%
                </div>
            </div>                                        
        </div>
    )
}