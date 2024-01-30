import { FC } from "react";
import s from './Row.module.css';
import { RowItem } from "./RowItem/RowItem";
import { IKeyboardColors } from "../../../models/layouts/layouts";

interface IRowProps{
    data: string[],
    colors: IKeyboardColors | null,
    keyToLight: string,
    pressedKey: string,
}

export const Row: FC<IRowProps> = ({ data, colors, keyToLight, pressedKey}) => {
    return (
        <div className={s.row}>
            {
                data.map((value, ind) => <RowItem value={value} ind={ind} colors={colors} keyToLight={keyToLight} pressedKey={pressedKey} key={ind}/>)
            }
        </div>
    )
}