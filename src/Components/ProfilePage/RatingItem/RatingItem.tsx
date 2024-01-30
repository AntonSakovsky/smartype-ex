import React, { FC } from "react";
import s from './RatingItem.module.css';

interface IRatingItem {
    num: number,
    username: string,
    speed: number,
    accuracy: number,
    me: boolean
}

export const RatingItem: FC<IRatingItem> = ({accuracy, num, speed, username, me}) => {

    return (
        <div className={me? s.me + ' ' + s.profileRatingItem : s.profileRatingItem}>
            <div className={s.ratingUserInfo}>
                <div className={s.profileRatingPosition}>{num}.</div>
                <div className={s.profileRatingName}>{username}</div>
            </div>
            <div className={s.statsWrap}>
                <div className={s.profileRatingSpeed + ' ' + s.stat}>
                    <i className="fa-regular fa-gauge-high"></i>
                    <span>{speed}</span> зн/мин
                </div>
                <div className={s.profileRatingAccuracy + ' ' + s.stat}>
                    <i className="fa-regular fa-bullseye"></i>
                    <span>{accuracy}</span>%
                </div>
            </div>

        </div>

    )
}