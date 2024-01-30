import { Layouts } from "./Layouts/Layouts";
import s from './Levels.module.css';
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";
import { useEffect } from "react";
import { LevelsList } from "./LevelsList";
import { fetchLevels, fetchPracticeLevels } from "../../store/reducers/LevelsPageThunkCreators";
import { PracticeList } from "./PracticeList";
import { Loader } from "../Loader/Loader";
import { useAuth } from "../../store/hooks/useAuth";

export const LevelsPage = () => {
    const dispatch = useAppDispatch();
    const uid = useAppSelector(state => state.user.uid);
    const { levels, practice, levelsIsFetching, practiceIsFetching, layoutLang } = useAppSelector(state => state.levelsPage)

    const user = useAuth();

    useEffect(() => {
        document.body.style.backgroundColor = 'var(--bg-body)';
    })

    useEffect(() => {
        dispatch(fetchLevels(String(uid), layoutLang));
        dispatch(fetchPracticeLevels(String(uid)));
    }, [user.isAuth])
    return (
        <>
            <Navbar />
            <div className='container'>
                <main className={s.main}>
                    <Layouts />
                    <div className={s.wrapper}>
                        <div className={s.mainLevelsWrap}>
                            <h2 className={s.mainTitle}>Тренировочные уровни</h2>
                            {
                                levelsIsFetching ?
                                    <Loader width={80} height={80} style={{ marginBottom: 20 }} strokeWidth={5} />
                                    :
                                    <LevelsList levelsArr={levels} />
                            }
                        </div>
                        <hr className={s.practiceDelimiter}></hr>
                        <div className={s.practiceLevelsWrap}>
                            <h2 className={s.mainTitle}>Практика</h2>
                            {
                                practiceIsFetching ?
                                    <Loader width={80} height={80} style={{ marginBottom: 20 }} strokeWidth={5} />
                                    :
                                    <PracticeList levelsArr={practice} />
                            }
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>

    )
}