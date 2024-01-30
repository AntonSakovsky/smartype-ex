import s from './Rating.module.css';
import { RatingItem } from "../RatingItem/RatingItem";
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux-hooks';
import { useEffect } from 'react';
import { fetchRatingList } from '../../../store/reducers/ProfileSlice';
import { Loader } from '../../Loader/Loader';

export const RatingList = () => {
    const dispatch = useAppDispatch();
    const { isDataLoading, ratingList } = useAppSelector(state => state.profilePage);
    const { name, uid } = useAppSelector(state => state.user)

    useEffect(() => {
        dispatch(fetchRatingList());
    }, [])

    return (
        <div className={s.profileRating}>
            {
                isDataLoading ?
                    <Loader width={55} height={55} style={{ display: 'flex', justifyContent: 'center' }} strokeWidth={5} />
                    :
                    ratingList.length === 0 ?
                        <div style={{ marginTop: 20, textAlign: 'center' }}>Результаты отсутствуют</div>
                        :
                        ratingList.map((item, ind) => <RatingItem
                            accuracy={item.accuracy}
                            speed={item.speed}
                            username={String(name)}
                            num={ind + 1}
                            me={uid === item.uid}
                            key={ind} />)
            }
        </div>
    )
}