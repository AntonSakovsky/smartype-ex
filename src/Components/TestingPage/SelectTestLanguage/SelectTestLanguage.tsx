import React, { useEffect, useState } from 'react';
import s from '../TestingPage.module.css';
import { langHash } from '../../../models/constants/constants';

interface ISelectTestLanguageProps { 
    action: (lang: string) => void;
}

export const SelectTestLanguage: React.FC<ISelectTestLanguageProps> = ({ action}) => {
    const [layoutName, setLayoutName] = useState('Русская раскладка');
    const [layoutsVisibility, setLayoutsVisibility] = useState(false);

    const SelectLayoutHandler = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLayoutsVisibility(true);
    }

    const ChangeLayoutHandler = (lang: string) => {
        setLayoutName(langHash[lang]);
        setLayoutsVisibility(false);
        action(lang);
    }

    useEffect(() => {
        const clickHandler = () => {
            if (layoutsVisibility) {
                setLayoutsVisibility(false);
            }
        }
        window.addEventListener('click', clickHandler);
        return () => {
            window.removeEventListener('click', clickHandler);
            action('ru');//dispatch lang to initial state
        }

    }, [layoutsVisibility]);

    return (
        <div className={s.layoutSelectWrap}>
            <div className={s.layoutSelect} onClick={SelectLayoutHandler}>
                {layoutName} <i className="fa-solid fa-greater-than"></i>
            </div>
            <ul className={s.layoutUl + ' ' + (!layoutsVisibility ? s.hide : '')} >
                <li className={s.layoutLi} onClick={() => ChangeLayoutHandler('ru')} >Русская раскладка</li>
                <li className={s.layoutLi} onClick={() => ChangeLayoutHandler('en')} >English layout</li>
            </ul>
        </div>

    )
}