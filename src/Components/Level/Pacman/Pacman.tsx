import { FC } from 'react';
import s from '../SingleLevel.module.css';

interface IPacmanProps {
    eating: boolean,
    red: boolean,
 }

export const Pacman: FC<IPacmanProps> = ({eating, red}) => {
    return (
        <div className={s.pacman + (red ? ` ${s.pred}` : '')}>
            <div className={s.pacmanEye}></div>
            <div className={s.pacmanMouth + (eating ? ` ${s.open}` : '')}></div>
        </div>
    )
}