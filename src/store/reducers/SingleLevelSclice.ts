import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ILevels, IPractice, ISingleLevel } from "../../models/types";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { RootState } from "../store";

type FetchLevelTextType = {
    lang: string;
    symbols: string;
};
export const fetchLevelText = createAsyncThunk<
    string | undefined,
    FetchLevelTextType,
    { rejectValue: string }
>(
    "singleLevel/fetchText",
    async function (data: FetchLevelTextType, { rejectWithValue }) {
        try {
            const storageRef = ref(
                storage,
                `levels/${data.lang}/${data.symbols}.txt`
            );
            const url = await getDownloadURL(storageRef);
            let response = await fetch(url);
            if (!response.ok) {
                rejectWithValue("Не удалось получть текст. Ошибка сервера.");
            }
            const text = await response.text();
            return text;
        } catch (error: any) {
            console.log(error.message);
            rejectWithValue(error.message);
        }
    }
);

type FetchPracticeTextType = {
    lang: string;
};
export const fetchPracticeText = createAsyncThunk<
    string | undefined,
    FetchPracticeTextType,
    { rejectValue: string }
>(
    "singleLevel/fetchPracticeText",
    async function (data: FetchPracticeTextType, { rejectWithValue }) {
        try {
            const n = Math.floor(1 + Math.random() * (2 + 1 - 1));
            const storageRef = ref(storage, `practice/${data.lang}${n}.txt`);
            const url = await getDownloadURL(storageRef);
            let response = await fetch(url);
            if (!response.ok) {
                rejectWithValue("Не удалось получть текст. Ошибка сервера.");
            }
            const text = await response.text();
            return text;
        } catch (error: any) {
            console.log(error.message);
            rejectWithValue(error.message);
        }
    }
);

type UpdateUserDBType = Omit<ILevels, 'count' | 'symb' | 'id'>

export const updateUserLevels = createAsyncThunk<
    void,
    UpdateUserDBType,
    { rejectValue: string; state: RootState }
>(
    "singleLevel/updateUserLevels",
    async function (obj: UpdateUserDBType, { rejectWithValue, getState }) {
        try {
            const uid = getState()?.user.uid;
            const layoutLang = getState()?.levelsPage.layoutLang;
            const {symbols, count, lvlId} = getState()?.singleLevel;
            //Обновление данных об уровне в пользователе
            const levelsRef = doc(db, "levels", `/${uid}`);
            const snap = await getDoc(levelsRef);
            const snapData = snap.data();
            if (snapData) {
                const levels = snapData[layoutLang];
                const data: ILevels = {
                    symb: symbols,
                    accuracy: obj.accuracy,
                    count: count,
                    speed: obj.speed,
                    time: obj.time,
                    id: lvlId as number,
                };
                for (let i = 0; i < levels.length; i++) {
                    if (levels[i].id === lvlId) {
                        levels[i].accuracy = data.accuracy;
                        levels[i].speed = data.speed;
                        levels[i].time = data.time;
                        levels[i].count = data.count + 1;
                    }
                }
                updateDoc(levelsRef, { [layoutLang]: levels });
            }
        } catch (error: any) {
            console.log(error.message);
            rejectWithValue(error.message);
        }
    }
);

export const updateUserProgress = createAsyncThunk<
    void,
    UpdateUserDBType,
    { rejectValue: string; state: RootState }
>(
    "singleLevel/updateUserProgress",
    async function (data: UpdateUserDBType, { rejectWithValue, getState }) {
        try {
            const uid = getState()?.user.uid;
            const {symbols, count, lvlId} = getState()?.singleLevel;
            //Обновление данных об уровне в пользователе
            const progressRef = doc(db, "progress", `/${uid}`);
            const snap = await getDoc(progressRef);
            const passedLvls = snap.data()?.passed;
            let isChanged = false;
            for (let i = 0; i < passedLvls.length; i++) {
                if (passedLvls[i].symb === symbols) {
                    isChanged = true;
                    passedLvls[i].accuracy = data.accuracy;
                    passedLvls[i].speed = data.speed;
                    passedLvls[i].time = data.time;
                    passedLvls[i].count = count + 1;
                }
            }
            if (!isChanged) {
                passedLvls.push({
                    symb: symbols,
                    accuracy: data.accuracy,
                    count: count + 1,
                    speed: data.speed,
                    time: data.time,
                    id: lvlId,
                });
            }
            updateDoc(progressRef, { passed: passedLvls });
        } catch (error: any) {
            console.log(error.message);
            rejectWithValue(error.message);
        }
    }
);

export const updateUserPractice = createAsyncThunk<
    void,
    IPractice,
    { rejectValue: string; state: RootState }
>(
    "singleLevel/updateUserPractice",
    async function (data: IPractice, { rejectWithValue, getState }) {
        try {
            const uid = getState()?.user.uid;
            
            //Обновление данных об уровне в пользователе
            const practiceRef = doc(db, 'practice', `/${uid}`,)
            const snap = await getDoc(practiceRef);
            const snapData = snap.data();
            if (snapData) {
                const levels = snapData.practiceArr
                for (let i = 0; i < levels.length; i++) {
                    if (levels[i].lang === data.lang) {
                        levels[i].accuracy = data.accuracy;
                        levels[i].speed = data.speed;
                        levels[i].time = data.time;
                    }
                }
                updateDoc(practiceRef, { practiceArr: levels });
            }
        } catch (error: any) {
            console.log(error.message);
            rejectWithValue(error.message);
        }
    }
);

const initialState: ISingleLevel = {
    isPractice: false,
    symbols: "",
    lang: "",
    short: "",
    textToWrite: "",
    writtenText: "",
    isLoading: false,
    delta: 0,
    error: "",
    lvlId: 0,
    count: 0,
};
export const singleLevelSlice = createSlice({
    name: "singleLevelSlice",
    initialState,
    reducers: {
        setTextToWrite(state, action: PayloadAction<string>) {
            state.textToWrite = action.payload;
        },
        setWrittenText(state, action: PayloadAction<string>) {
            state.writtenText = action.payload;
        },
        setSymbols(state, action: PayloadAction<string>) {
            state.symbols = action.payload;
        },
        setLevelId(state, action: PayloadAction<number>) {
            state.lvlId = action.payload;
        },
        setShortLang(state, action: PayloadAction<string>) {
            state.short = action.payload;
        },
        setLanguage(state, action: PayloadAction<string>) {
            state.lang = action.payload;
        },
        setCount(state, action: PayloadAction<number>) {
            state.count = action.payload;
        },
        resetLevelData(state) {
            state.count = 0;
            state.delta = 0;
            state.error = "";
            state.isLoading = false;
            state.isPractice = false;
            state.lang = "";
            state.lvlId = 0;
            state.short = "";
            state.symbols = "";
            state.textToWrite = "";
            state.writtenText = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLevelText.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPracticeText.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLevelText.fulfilled, (state, action) => {
                if (action.payload) {
                    state.textToWrite = action.payload;
                    const textLength = action.payload.length;
                    state.delta = +((1 / textLength) * 100).toFixed(2);
                }
                state.writtenText = "";
                state.isLoading = false;
            })
            .addCase(fetchPracticeText.fulfilled, (state, action) => {
                if (action.payload) {
                    state.textToWrite = action.payload;
                    const textLength = action.payload.length;
                    state.delta = +((1 / textLength) * 100).toFixed(2);
                }
                state.writtenText = "";
                state.isLoading = false;
            })
            .addCase(fetchLevelText.rejected, (state, action) => {
                if (action.payload) state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchPracticeText.rejected, (state, action) => {
                if (action.payload) state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export default singleLevelSlice.reducer;
export const {
    resetLevelData,
    setCount,
    setLanguage,
    setShortLang,
    setSymbols,
    setTextToWrite,
    setWrittenText,
    setLevelId,
} = singleLevelSlice.actions;
