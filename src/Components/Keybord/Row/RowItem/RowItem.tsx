import { FC } from "react";
import s from './RowItem.module.css';
import { IKeyboardColors } from "../../../../models/layouts/layouts";

interface IRowItemProps {
    value: string,
    colors: IKeyboardColors | null,
    ind: number | null,
    keyToLight: string,
    pressedKey: string,
}
type THash = {
    key: string,
    value: string,
    
    location?: number,
}
export const RowItem: FC<IRowItemProps> = ({ value, colors, ind, keyToLight, pressedKey }) => {
    let style = s.rowItem + ' ';
    let hash: THash = {
        key: '',
        value: '',
    }
    hash.key = value;
        hash.value = value;
    if (value == '←') {
        hash.key = 'backspace';
        hash.value = value;
        style += s.larr + ' ';
    } 
    if (value === 'TAB') {
        style += s.tab + ' ';
    }
    if (value === 'CAPS') {
        style +=  s.caps + ' ';
    }
    if (value === 'ENTER') {
        style += s.enter + ' ';
    }
    if (value === 'SHIFT') {
        if(ind == 0){
            style += s.shiftl + ' ';
            hash.location = 1;
        }else{
            style +=  s.shiftr + ' ';
            hash.location = 2;
        }
    }
    if (value == ' ') {
        style += s.darkBlue + ' ' + s.space;
    }
    
    style += colors?.darkblue.includes(value) ? s.darkBlue : '';
    style += colors?.green.includes(value) ? s.green : '';
    style += colors?.blue.includes(value) ? s.blue : '';
    style += colors?.pink.includes(value) ? s.pink : '';
    style += colors?.orange.includes(value) ? s.orange : '';
    style += colors?.yellow.includes(value) ? s.yellow : '';
    return (
        <div className={style + (keyToLight.toUpperCase() === value ? ' '+s.current : '') + (pressedKey.toUpperCase() === value ? ' ' + s.scaled : '') } data-location={hash.location !== null ? hash.location : ''} data-value={hash.key}>{hash.value}</div>
    )
}