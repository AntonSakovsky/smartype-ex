import { NavLink } from "react-router-dom";
import s from './PracticeItem.module.css';
import { useAppDispatch } from "../../../store/hooks/redux-hooks";
import { setLanguage, setShortLang } from "../../../store/reducers/SingleLevelSclice";


interface IPracticeProps{
    lang: string
    shortName: string
    time: string
    speed: number
    accuracy: number
}

export const PracticeItem = ({lang, shortName, time, speed, accuracy}: IPracticeProps) =>{
    const dispatch = useAppDispatch();
    return(
        <NavLink to="/level" className={s.levelWrap} onClick={()=>{
            dispatch(setLanguage(lang));
            dispatch(setShortLang(shortName));
        }}>
            <header>
                <p className={s.symbols}>{lang}</p>
            </header>
            <main>                
                <div className={s.countInfo}>
                    <div className={s.circle}>
                        <p className={s.count + ' ' + s.programmingLang}>{shortName}</p>
                    </div>
                </div>
            </main>
            <footer>
                <div className={s.time}>
                    <i className="fa-regular fa-clock"></i>
                    <span>{time}</span>
                </div>
                <div className={s.speed}>
                    <i className="fa-regular fa-gauge-high"></i>
                    {speed}<span>зн/мин</span>
                </div>
                <div className={s.accuracy}>
                    <i className="fa-regular fa-bullseye"></i>
                    <span>{accuracy}%</span>
                </div>
            </footer>
        </NavLink>
    )
}