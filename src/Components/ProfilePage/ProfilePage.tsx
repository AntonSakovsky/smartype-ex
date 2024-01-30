import { FC, useEffect, useState } from "react";
import avatarka from '../../img/profile_icon.jpg';
import s from './ProfilePage.module.css';
import { RatingList } from "./RatingList/RatingList";
import { UserLevelsList } from "./UserLevels/UserLevelsList/UserLevelsList";
import { UserTestsList } from "./UserTests/UserTestsList/UserTestsList";
import { getAuth, signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoutButton } from "./LogoutButton/LogoutButton";
import { useAppSelector } from "../../store/hooks/redux-hooks";


const Routes: Record<string, JSX.Element> = {
    levels: <UserLevelsList />,
    tests: <UserTestsList />,
    rating: <RatingList />,
}
type RoutesType = 'levels' | 'tests' | 'rating';

interface IProfilePage {
    username: string,
    count: number,
    speed: number,
    accuracy: number,
}

export const ProfilePage: FC<IProfilePage> = ({ accuracy, count, speed, username }) => {
    const [route, setRoute] = useState<RoutesType>('levels');
    const [activeLink, setActiveLink] = useState<RoutesType>('levels');
    const navigate = useNavigate();
    const img = useAppSelector(state => state.user.img);
    const hash = useLocation().hash;

    useEffect(()=>{
        switch (hash) {
            case '#levels':
                setRoute('levels');
                setActiveLink("levels");
                break;
            case '#tests':
                setRoute("tests");
                setActiveLink('tests');
                break;
            case '#rating':
                setRoute('rating');
                setActiveLink('rating');
                break;
            default:
                break;
        }
    }, [hash])
   


    const LinkClickHandler = (route: RoutesType) => {
        setRoute(route);
        setActiveLink(route);
    }

    const logoutHandle = async () => {
        try {
            const auth = getAuth();
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Ошибка при выходе из аккаунта:', error);
        }
    }

    useEffect(() => {
        document.body.style.backgroundColor = 'var(--bg-body)';
    }, [])
    return (
        <>
            <div className='container'>
                <main className={s.profileMain}>
                    <LogoutButton logoutHandle={logoutHandle} />
                    <div className={s.profileHeader}>
                        <div className={s.userImg}>
                            <img src={img ? img : avatarka} alt="Аватарка" />
                        </div>
                        <div className={s.userInfo}>
                            <h2 className={s.userName}>{username}</h2>
                            <div className={s.userBestStats}>
                                <div className={s.statsItem}>
                                    <div className={s.statsItemIcon + ' ' + s.progress}>
                                        <i className="fa-solid fa-list-check"></i>
                                    </div>
                                    <div className={s.statsItemDescr}>
                                        <div className={s.statsItemTitle}>Уровней</div>
                                        <span>{count}</span>
                                    </div>
                                </div>
                                <div className={s.statsItem}>
                                    <div className={s.statsItemIcon + ' ' + s.speed}>
                                        <i className="fa-regular fa-gauge-high"></i>
                                    </div>
                                    <div className={s.statsItemDescr}>
                                        <div className={s.statsItemTitle}>Скорость</div>
                                        <span>{speed}</span> зн/мин
                                    </div>
                                </div>
                                <div className={s.statsItem}>
                                    <div className={s.statsItemIcon + ' ' + s.accuracy}>
                                        <i className="fa-regular fa-bullseye"></i>
                                    </div>
                                    <div className={s.statsItemDescr}>
                                        <div className={s.statsItemTitle}>Точность</div>
                                        <span>{accuracy}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <nav className={s.profileNav}>
                        <a className={s.profileNavLink + (activeLink === 'levels' ? ` ${s.curr}` : '')} href="#levels" onClick={() => LinkClickHandler('levels')}>Уровни</a>
                        <a className={s.profileNavLink + (activeLink === 'tests' ? ` ${s.curr}` : '')} href="#tests" onClick={() => LinkClickHandler('tests')}>Тесты</a>
                        <a className={s.profileNavLink + (activeLink === 'rating' ? ` ${s.curr}` : '')} href="#rating" onClick={() => LinkClickHandler('rating')}>Рейтинг</a>
                    </nav>

                    <div id="profile-nav-content">
                        {
                            Routes[route]
                        }
                    </div>

                </main>

            </div>
        </>

    )
}