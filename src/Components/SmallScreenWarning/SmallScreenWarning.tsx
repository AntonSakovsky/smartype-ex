import { FC } from "react";
import s from './SmallScreenWarning.module.css';
import smallscreenImg from '../../img/small-screen.png';

interface ISmallScreenProps {}
export const SmallScreenWarning: FC<ISmallScreenProps> = ()=> {
    return(
        <div className={s.smallScreen}>
            <div className={s.smallScreenImg}>
                <img src={smallscreenImg} alt="Маленький экран" />
            </div>
            <div className={s.description}>
                Слишком маленький экран
            </div>
        </div>
    )
}