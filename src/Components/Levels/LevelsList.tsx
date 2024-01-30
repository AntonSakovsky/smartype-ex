import React, { FC } from "react";
import styles from './Levels.module.css';
import { LevelItem } from "./LevelItem/LevelItem";
import { ILevels } from "../../models/types";

interface ILevelsListProps {
    levelsArr: ILevels[],
}

export const LevelsList: FC<ILevelsListProps> = ({ levelsArr }) => {
    return (
        <div className={styles.levelsWrap}>
            {
                levelsArr.map(lvl =>
                    <LevelItem symbols={lvl.symb}
                        count={lvl.count}
                        id={lvl.id}
                        speed={lvl.speed}
                        time={lvl.time}
                        accuracy={lvl.accuracy}
                        key={lvl.id} />)
            }
        </div>
    )
}