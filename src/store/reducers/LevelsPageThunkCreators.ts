import { AppDispatch } from "../store";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { setLevels, setLevelsFetching, setPractice, setPracticeFetching } from "./LevelsPageSlice";

export const fetchLevels = (uid: string, lang: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLevelsFetching(true));
        const levelsRef = doc(db, "levels/", `${uid}`);
        const snap = await getDoc(levelsRef);
        const levelsArr = snap.data();
        //для плавности переходов добавлено
        setTimeout(()=>{
            dispatch(setLevelsFetching(false));
            if(levelsArr){
                dispatch(setLevels({levels: levelsArr[lang]}));
            }
        },100);
        
    } catch (error: any) {
        //dispatch error message
        console.log(error.message);
    }
};

export const fetchPracticeLevels = (uid: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setPracticeFetching(true));
        const levelsRef = doc(db, "practice/", `${uid}`);
        const snap = await getDoc(levelsRef);
        const levelsArr = snap.data();
        setTimeout(()=>{
            dispatch(setPracticeFetching(false));
            if(levelsArr){
                dispatch(setPractice({practiceLevels: levelsArr.practiceArr}));
            }
        }, 100)
        
    } catch (error: any) {
        //dispatch error message
        console.log(error.message);
    }
};
