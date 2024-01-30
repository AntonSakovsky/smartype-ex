import s from './UserTests.module.css';
import { UserTestItem } from "../UserTestItem/UserTestItem";
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/redux-hooks';
import { fetchUserTests } from '../../../../store/reducers/ProfileSlice';
import { useEffect } from 'react';
import { Loader } from '../../../Loader/Loader';

export const UserTestsList = () => {
    const dispatch = useAppDispatch();
    const { isDataLoading, tests } = useAppSelector(state => state.profilePage);

    useEffect(() => {
        dispatch(fetchUserTests());
    }, [])
    return (
        <div className={s.profileTests}>
            {
                isDataLoading ?
                    <Loader width={55} height={55} style={{ display: 'flex', justifyContent: 'center' }} strokeWidth={5} />
                    :
                    tests.length === 0 ?
                        <div style={{ marginTop: 20, textAlign: 'center' }}>Вы ещё не проходили тестов</div>
                        :
                        tests.map((test, ind) => <UserTestItem
                            accuracy={test.accuracy}
                            date={test.date}
                            speed={test.speed}
                            num={ind + 1}
                            key={ind} />)
            }
        </div>
    )
}