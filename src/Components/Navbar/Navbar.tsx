import s from './Navbar.module.css';
import {useState} from 'react';
import {NavLink} from 'react-router-dom';

export const Navbar = ()=> {
    const [collapsed, setCollapsed] = useState(true)
    const navigationCollapse = ()=>{
        setCollapsed(prev => !prev);
    }

    return(
        <div className={"container" + (collapsed ? '' : " "+s.heightAlign)}>
            <header className={s.header}>
                <nav className={s.nav}>
                    <div className={s.logo}>
                        <NavLink to='/'>SmarType</NavLink>
                        <div className={s.burger} onClick={navigationCollapse}>
                            <span className={s.burgerItem + (collapsed ? '' : " "+s.first)}></span>
                            <span className={s.burgerItem + (collapsed ? '' : " "+s.second)}></span>
                            <span className={s.burgerItem + (collapsed ? '' : " "+s.third)}></span>
                        </div>
                    </div>
                    <ul className={s.navigationList + (collapsed ? '' : " " +s.opacity)}>
                        <li className={s.navigationItem}><NavLink to="/" 
                                                                  className={({ isActive }) =>
                                                                    isActive ? s.active : ""
                                                                  }
                                                                  >уровни</NavLink></li>
                        <li className={s.navigationItem}><NavLink to="/test" 
                                                                  className={({ isActive }) =>
                                                                    isActive ? s.active : ""
                                                                  }
                                                                  >тестирование</NavLink></li>
                        <li className={s.navigationItem}><NavLink to="/theory" 
                                                                  className={({ isActive }) =>
                                                                    isActive ? s.active : ""
                                                                  }
                                                                  >теория</NavLink></li>
                        <li className={s.navigationItem}><NavLink to="/profile" 
                                                                  className={({ isActive }) =>
                                                                    isActive ? s.active : ""
                                                                  }
                                                                  >профиль</NavLink></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}