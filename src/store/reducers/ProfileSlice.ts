import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILevels, IProfile, IRatingItem, ITest } from "../../models/types";
import { AppDispatch, RootState } from "../store";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const fetchPassedLevels = createAsyncThunk<
    void,
    undefined,
    { rejectValue: string; state: RootState; dispatch: AppDispatch }
>("profileSlice/fetchPassedLevels", async (_, thunkAPI) => {
    try {
        const dispatch = thunkAPI.dispatch;
        dispatch(setIsDataLoading(true));
        const uid = thunkAPI.getState()?.user.uid;
        const levelsRef = doc(db, "progress", `/${uid}`);
        let snap = await getDoc(levelsRef);
        const levels = snap.data()?.passed;
        const newLevels = levels.sort((a: ILevels, b: ILevels) => a.id - b.id);
        dispatch(setIsDataLoading(false));
        dispatch(setPassedLevels(newLevels));
    } catch (error: any) {
        thunkAPI.rejectWithValue("Не удалось получить данные. Ошибка сервера.");
    }
});

export const fetchUserTests = createAsyncThunk<
    void,
    undefined,
    { rejectValue: string; state: RootState; dispatch: AppDispatch }
>("profileSlice/fetchUserTests", async (_, thunkAPI) => {
    try {
        const dispatch = thunkAPI.dispatch;
        dispatch(setIsDataLoading(true));
        const uid = thunkAPI.getState()?.user.uid;
        const testsRef = doc(db, "tests", `/${uid}`);
        let snap = await getDoc(testsRef);
        const tests = snap.data()?.arr;
        dispatch(setIsDataLoading(false));
        dispatch(setTests(tests));
    } catch (error: any) {
        thunkAPI.rejectWithValue("Не удалось получить данные. Ошибка сервера.");
    }
});

export const fetchRatingList = createAsyncThunk<
    void,
    undefined,
    { rejectValue: string; state: RootState; dispatch: AppDispatch }
>("profileSlice/fetchRatingList", async (_, thunkAPI) => {
    try {
        const dispatch = thunkAPI.dispatch;
        dispatch(setIsDataLoading(true));
        const ratingRef = doc(db, "rating", `/rating`);
        const snap = await getDoc(ratingRef);
        const ratingList = snap.data()?.results;
        
        dispatch(setIsDataLoading(false));
        dispatch(setRatingList(ratingList));
    } catch (error: any) {
        thunkAPI.rejectWithValue("Не удалось получить данные. Ошибка сервера.");
    }
});

export const fetchProfileData = createAsyncThunk<
    void,
    undefined,
    { rejectValue: string; state: RootState; dispatch: AppDispatch }
>("profileSlice/fetchProfileData", async (_, thunkAPI) => {
    try {
        const dispatch = thunkAPI.dispatch;
        dispatch(setIsPageLoading(true));
        const uid = thunkAPI.getState()?.user.uid;

        const testsRef = doc(db, "tests", `/${uid}`);
        let snap = await getDoc(testsRef);
        const best = snap.data()?.best;
        let speed = best.speed;
        let accuracy = best.accuracy;

        const levelsRef = doc(db, "progress", `/${uid}`);
        snap = await getDoc(levelsRef);
        const levels = snap.data()?.passed;
        const count = levels.length;

        const data: ProfileUserDataType = {
            accuracy,
            count,
            speed,
        };
        dispatch(setIsPageLoading(false));
        dispatch(setProfileUserData(data));
    } catch (error: any) {
        thunkAPI.rejectWithValue("Не удалось получить данные. Ошибка сервера.");
    }
});

const initialState: IProfile = {
    levelsCount: 0,
    maxTestAccuracy: 0,
    maxTestSpeed: 0,
    passedLevels: [],
    tests: [],
    ratingList: [],
    isPageLoading: false,
    isDataLoading: false
};

type ProfileUserDataType = {
    count: number;
    accuracy: number;
    speed: number;
};

export const profileSlice = createSlice({
    name: "profileSlice",
    initialState,
    reducers: {
        setPassedLevels(state, action: PayloadAction<ILevels[]>) {
            state.passedLevels = action.payload;
        },
        setTests(state, action: PayloadAction<ITest[]>) {
            state.tests = action.payload;
        },
        setRatingList(state, action: PayloadAction<IRatingItem[]>) {
            state.ratingList = action.payload;
        },
        setIsPageLoading(state, action: PayloadAction<boolean>) {
            state.isPageLoading = action.payload;
        },
        setIsDataLoading(state, action: PayloadAction<boolean>) {
            state.isDataLoading = action.payload;
        },
        setProfileUserData(state, action: PayloadAction<ProfileUserDataType>) {
            state.levelsCount = action.payload.count;
            state.maxTestAccuracy = action.payload.accuracy;
            state.maxTestSpeed = action.payload.speed;
        },
    },
});

export default profileSlice.reducer;
export const {
    setProfileUserData,
    setPassedLevels,
    setRatingList,
    setTests,
    setIsPageLoading,
    setIsDataLoading
} = profileSlice.actions;
