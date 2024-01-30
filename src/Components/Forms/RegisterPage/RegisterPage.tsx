import { useEffect, useState } from "react";
import styles from '../Forms.module.css'
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../Form/Form";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup, updateProfile } from "firebase/auth";
import { useAppDispatch } from "../../../store/hooks/redux-hooks";
import { IUser, setUser } from "../../../store/reducers/UserSlice";
import { initNewUserInDB, isExist } from "../funcsForAuth";

export const RegisterPage = () => {
    const [warningText, setWarningText] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const signUp = (name: string, email: string, password: string) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                debugger
                const user = userCredential.user;
                console.log(user);
                const newUser: IUser = {
                    name,
                    email,
                    img: user.photoURL,
                    uid: user.uid,
                }
                dispatch(setUser(newUser));
                updateProfile(user, { displayName: name });
                initNewUserInDB(newUser)
                    .then((resp) => navigate("/"))
                    .catch((error) => console.error(error.message));
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/email-already-in-use') {
                    setWarningText('Пользователь с такой почтой уже существует');
                }
                if (errorCode === 'auth/weak-password') {
                    setWarningText('Слабый пароль(минимум 6 символов)');
                }
            });
    }

    const signUpGoogle = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const newUser: IUser = {
                    name: user.displayName,
                    email: user.email,
                    img: user.photoURL,
                    uid: user.uid,
                }
                dispatch(setUser(newUser));
                isExist(user.uid)
                    .then((resp) => {
                        if (resp) {
                            navigate('/');
                        } else {
                            initNewUserInDB(newUser)
                                .then((response) => navigate('/'))
                                .catch((error) => console.error(error.message));
                        }
                    }).catch((error) => console.error(error.message));
            }).catch((error) => {
                console.error(error.message);
            });
    }

    useEffect(()=>{
        document.body.style.backgroundColor = "var(--bg-auth)";
    }, []);

    return (
        <div className={styles.formContainer}>
            <div className={styles.formWrap}>
                <Form title="Регистрация" btnText="Зарегистрироваться" handleClick={signUp} handleGoogle={signUpGoogle} type="registrate" />
                <div className={styles.register}>
                    <p>Уже есть аккаунт?<Link to="/login">Войти</Link></p>
                </div>
                <div className={styles.warning}>
                    {warningText}
                </div>
            </div>
        </div>
    );
}