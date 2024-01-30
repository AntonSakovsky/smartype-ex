import s from './UserLevels.module.css';
import { UserLevelItem } from "../UserLevelItem/UserLevelItem";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/redux-hooks';
import { fetchPassedLevels } from '../../../../store/reducers/ProfileSlice';
import { Oval } from 'react-loader-spinner';
import { Loader } from '../../../Loader/Loader';

export const UserLevelsList = () => {
    const dispatch = useAppDispatch();
    const { passedLevels, isDataLoading } = useAppSelector(state => state.profilePage)

    useEffect(() => {
        dispatch(fetchPassedLevels());
    }, [])
    return (
        <div className={s.profileLevels}>
            {
                isDataLoading ?
                    
                    <Loader width={55} height={55} strokeWidth={5} style={{ display: 'flex', justifyContent: 'center'}} />
                    :
                    passedLevels.length === 0 ? <div style={{ marginTop: 20, textAlign: 'center' }}>Вы ещё не проходили уровней</div>
                        :
                        passedLevels.map((lvl, ind) => <UserLevelItem
                            accuracy={lvl.accuracy}
                            count={lvl.count}
                            num={ind + 1}
                            speed={lvl.speed}
                            symb={lvl.symb}
                            time={lvl.time}
                            key={lvl.id}
                        />)
            }
        </div>
    )
}