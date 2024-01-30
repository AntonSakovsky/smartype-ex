import { FC } from "react"
import s from '../ProfilePage.module.css';

interface ILogoutButtonProps {
    logoutHandle: () => void
}

export const LogoutButton: FC<ILogoutButtonProps> = ({ logoutHandle }) => {
    return (
        <div className={s.logOut} onClick={logoutHandle}>
            <i className="fa-solid fa-arrow-right-from-bracket fa-rotate-180"></i>
            <p>Выйти</p>
        </div>
    )
}