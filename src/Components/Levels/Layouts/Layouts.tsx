import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Layouts.module.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux-hooks';
import { setLayoutLang } from '../../../store/reducers/LevelsPageSlice';
import { fetchLevels } from '../../../store/reducers/LevelsPageThunkCreators';


export const Layouts = ()=> {

    const lang = useAppSelector(state => state.levelsPage.layoutLang);
    const uid = useAppSelector(state => state.user.uid);
    const dispatch = useAppDispatch();

    const ClickHandler = (e: React.MouseEvent<HTMLLIElement>)=>{
        const lang: string = String((e.currentTarget as HTMLLIElement).dataset.lang);
        dispatch(setLayoutLang(lang));
        dispatch(fetchLevels(String(uid), lang));
    }
    return(
        <div className={s.chooseLangContainer}>
            <ul className={s.chooseLang}>
                <li onClick={ClickHandler} className={s.langItem + (lang === 'ru' ? ' '+s.selected : '')} data-lang="ru"><NavLink to="">Русский</NavLink></li>
                <li onClick={ClickHandler} className={s.langItem + (lang === 'en' ? ' '+s.selected : '')} data-lang="en"><NavLink to="">Английский</NavLink></li>
            </ul>
        </div>
    )
}