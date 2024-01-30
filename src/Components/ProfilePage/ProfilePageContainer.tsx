import { FC, useEffect } from "react";
import { Navbar } from "../Navbar/Navbar";
import { ProfilePage } from "./ProfilePage";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { fetchProfileData } from "../../store/reducers/ProfileSlice";
import { Loader } from "../Loader/Loader";
import { useAuth } from "../../store/hooks/useAuth";

interface IProfilePageContainer { }

export const ProfilePageContainer: FC<IProfilePageContainer> = () => {
    const dispatch = useAppDispatch();
    const { isPageLoading, maxTestAccuracy, maxTestSpeed, levelsCount } = useAppSelector(state => state.profilePage);
    const { name } = useAppSelector(state => state.user);
    const user = useAuth();

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [user.isAuth])

    return (
        <>
            <Navbar />
            {
                isPageLoading ?
                    <Loader width={80} height={80} style={{ display: 'flex', justifyContent: 'center' }} strokeWidth={5} />
                    :
                    <ProfilePage
                        accuracy={maxTestAccuracy}
                        count={levelsCount}
                        speed={maxTestSpeed}
                        username={String(name)} />
            }

        </>
    )
}