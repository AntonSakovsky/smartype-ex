import { useEffect, useState } from "react";
import styles from "../Forms.module.css"
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Form } from "../Form/Form";
import { useAppDispatch } from "../../../store/hooks/redux-hooks";
import { IUser, setUser } from "../../../store/reducers/UserSlice";
import { initNewUserInDB, isExist } from "../funcsForAuth";


export const LoginPage = () => {
    const [warningText, setWarningText] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const signIn = async (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch(setUser({
                    email,
                    name: user.displayName,
                    img: null,
                    uid: user.uid,
                }));
                navigate("/");
            })
            .catch((error) => {
                console.log(error.message);
                setWarningText(`Неверная почта или пароль`);
            });
    }
    const signInGoogle = async() => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result?.user;
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
                <Form btnText="Войти" handleClick={signIn} handleGoogle={signInGoogle} title="Вход" type="login" />
                <div className={styles.register}>
                    <p>Ещё нет аккаунта?<Link to="/registration">Зарегистрироваться</Link></p>
                </div>
                <div className={styles.warning}>
                    {warningText}
                </div>
            </div>
        </div>
    )
}