import { FC } from "react";
import styles from './Levels.module.css';
import { PracticeItem } from "./PracticeItem/PracticeItem";
import { IPractice } from "../../models/types";

interface IPracticeListProps {
    levelsArr: IPractice[],
}

export const PracticeList: FC<IPracticeListProps> = ({ levelsArr }) => {
    return (
        <div className={styles.levelsWrap}>
            {
                levelsArr.map((lvl, ind) =>
                    <PracticeItem accuracy={lvl.accuracy}
                        lang={lvl.lang}
                        shortName={lvl.short}
                        speed={lvl.speed}
                        time={lvl.time}
                        key={ind} />
                )
            }
        </div>
    )
}