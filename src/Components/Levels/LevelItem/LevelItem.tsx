import { NavLink } from "react-router-dom";
import s from './LevelItem.module.css';
import { useAppDispatch } from "../../../store/hooks/redux-hooks";
import { setCount, setLevelId, setSymbols } from "../../../store/reducers/SingleLevelSclice";
import { STORAGE_LEVEL_COUNT, STORAGE_LEVEL_ID, STORAGE_LEVEL_SYMBOLS } from "../../../models/constants/constants";

interface ILevelItemProps{
    symbols: string
    count: number
    time: string
    speed: number
    accuracy: number
    id: number
}
export const LevelItem = ({symbols, id, count, time, speed, accuracy}: ILevelItemProps)=> {
    const dispacth = useAppDispatch();
    return(
        <NavLink to="/level" className={s.levelWrap} onClick={()=> {
                dispacth(setSymbols(symbols));
                dispacth(setLevelId(id));
                dispacth(setCount(count));
                localStorage.setItem(STORAGE_LEVEL_SYMBOLS, symbols);
                localStorage.setItem(STORAGE_LEVEL_COUNT, String(count));
                localStorage.setItem(STORAGE_LEVEL_ID, String(id));
            }
            }>
            <header>
                <p className={s.symbols}>{symbols}</p>
            </header>
            <main>
                <h3 className={s.mainInfoTitle} data-lvl-id={id}>Уровень {id}</h3>
                <div className={s.countInfo}>
                    <div className={s.circle}>
                        <p className={s.count}>{count}</p>
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
                    {speed} <span>зн/мин</span>
                </div>
                <div className={s.accuracy}>
                    <i className="fa-regular fa-bullseye"></i>
                    <span>{accuracy}%</span>
                </div>
            </footer>
        </NavLink>
    )
}