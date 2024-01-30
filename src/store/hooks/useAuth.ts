import { useAppSelector } from "./redux-hooks"

export const useAuth = ()=> {
    const user = useAppSelector(state => state.user);
    return {
        isAuth: !!user.email,
        name: user.name,
        email: user.email,
        uid: user.uid
    }
}