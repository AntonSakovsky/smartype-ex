import React, { FC, ReactNode } from 'react';
import s from './CheckAuth.module.css';
import { useAuth } from '../../store/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch } from '../../store/hooks/redux-hooks';
import { removeUser, setUser } from '../../store/reducers/UserSlice';

interface IChechAuthProps  {
    children: ReactNode
}

export const CheckAuth: FC<IChechAuthProps> = (props)=>{
    const dispatch = useAppDispatch();
    const {children} = props;
    const user = useAuth();
    const auth = getAuth();

    const checkSessionTimeout = () => {
        onAuthStateChanged(auth, (userInfo) => {
          if (userInfo) {
            // Пользователь аутентифицирован и сессия активна
            dispatch(setUser({
                email: userInfo.email,
                name: userInfo.displayName,
                img: userInfo.photoURL,
                uid: userInfo.uid,
            }));
          } else {
            // Пользователь не аутентифицирован или сессия истекла
            if(!user.isAuth){
                return <Navigate to='/login'/>
            }
             dispatch(removeUser());
             
          }
        });
      };
      checkSessionTimeout();

     

    return(
        <>
         {children}
        </>        
    )
}