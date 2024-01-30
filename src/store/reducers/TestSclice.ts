import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { ITest, ITestSlice } from "../../models/types";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { AppDispatch, RootState } from "../store";

type FetchTextType = {
    lang: string;
};
export const fetchTestText = createAsyncThunk<
    string | undefined,
    FetchTextType,
    { rejectValue: string }
>("test/fetchText", async function (data: FetchTextType, { rejectWithValue }) {
    const num = Math.floor(1 + Math.random() * (10 + 1 - 1));
    const storageRef = ref(storage, `tests/${data.lang}/${num}.txt`);
    try {
        const url = await getDownloadURL(storageRef);
        const response = await fetch(url);
        if (!response.ok) {
            rejectWithValue("Не удалось загрузить текст. Ошибка сервера.");
        }
        const text = await response.text();
        return text;
    } catch (error: any) {
        console.log(error.message);
        rejectWithValue("Не удалось загрузить текст. Ошибка сервера.");
    }
});

type GetBestResultsType = {
    uid: string;
};
type RecordType = {
    speed: number;
    accuracy: number;
};

export const getBestResults = createAsyncThunk<
    RecordType | undefined,
    GetBestResultsType,
    { rejectValue: string }
>(
    "test/getBestResults",
    async function (data: GetBestResultsType, { rejectWithValue }) {
        try {
            const testsRef = doc(db, "tests", `${data.uid}/`);
            const snap = await getDoc(testsRef);
            const record = snap.data()?.best as RecordType;
            return record;
        } catch (error: any) {
            console.log(error.message);
            rejectWithValue("Не удалось получить рекорд. Ошибка сервера.");
        }
    }
);

type UpdateRecordType = {
    uid: string;
    speed: number;
    accuracy: number;
};

export const updateTestRecord = createAsyncThunk<
    void,
    UpdateRecordType,
    { rejectValue: string; state: RootState; dispatch: AppDispatch }
>(
    "test/updateTestRecord",
    async function (
        data: UpdateRecordType,
        { rejectWithValue, getState, dispatch }
    ) {
        try {
            let toBeChanged = false;
            const testsRef = doc(db, "tests", `${data.uid}/`);
            const currSpeed = getState()?.testing.bestSpeed;
            const currAccuracy = getState()?.testing.bestAccuracy;

            const record: RecordType = {
                speed: data.speed,
                accuracy: data.accuracy,
            };

            if (record.speed < currSpeed) {
                record.speed = currSpeed; // чтобы не изменить значение в бд т.к. там будет больше
            }
            if (record.speed > currSpeed) {
                toBeChanged = true;
            }
            if (record.accuracy < currAccuracy) {
                record.accuracy = currAccuracy; // чтобы не изменить значение в бд т.к. там будет больше
            }
            if (record.accuracy > currAccuracy) {
                toBeChanged = true;
            }

            if (toBeChanged) {
                updateDoc(testsRef, { best: record });
            }
        } catch (error: any) {
            console.log(error.message);
            rejectWithValue("Не обновить рекорд. Ошибка сервера.");
        }
    }
);

export const updateUserTests = createAsyncThunk<
    void,
    ITest,
    { rejectValue: string; state: RootState }
>(
    "test/updateUserTests",
    async function (data: ITest, { rejectWithValue, getState }) {
        try {
            const uid = getState()?.user.uid;

            const testsRef = doc(db, "tests", `${uid}/`);
            const snap = await getDoc(testsRef);
            const tests = snap.data()?.arr;
            tests.push(data);
            updateDoc(testsRef, { arr: tests });
        } catch (error: any) {
            console.log(error.message);
            rejectWithValue("Не удалось обновить тесты. Ошибка сервера.");
        }
    }
);

export const updateUserRating = createAsyncThunk<
    void,
    ITest,
    { rejectValue: string; state: RootState }
>(
    "test/updateUserRating",
    async function (data: ITest, { rejectWithValue, getState }) {
        try {
            const uid = getState()?.user.uid;
            const name = getState()?.user.name;
            
            let ratingRef = doc(db, `rating/`, 'rating');
            let snap = await getDoc(ratingRef);
            const results = snap.data()?.results;
            let isChanged = false;
            for (let i = 0; i < results.length; i++) {
                if (results[i].uid === uid) {
                    isChanged = true;
                    if (results[i].speed < data.speed) {
                        results[i].accuracy = data.accuracy;
                        results[i].speed = data.speed;
                    }
                }
            }
            if (!isChanged) {
                results.push({
                    uid: uid,
                    username: name,
                    speed: data.speed,
                    accuracy: data.accuracy,
                })
            }
            updateDoc(ratingRef, { results: results });
        } catch (error: any) {
            console.log(error.message);
            rejectWithValue("Не удалось обновить рейтинг. Ошибка сервера.");
        }
    }
);

const initialState: ITestSlice = {
    lang: "ru",
    text: "",
    isLoading: false,
    delta: 0,
    error: "",
    bestSpeed: 0,
    bestAccuracy: 0,
};
export const testSlice = createSlice({
    name: "singleLevelSlice",
    initialState,
    reducers: {
        setLang(state, action: PayloadAction<string>) {
            state.lang = action.payload;
        },
        setBestSpeed(state, action: PayloadAction<number>) {
            state.bestSpeed = action.payload;
        },
        setBestAccuracy(state, action: PayloadAction<number>) {
            state.bestAccuracy = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestText.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTestText.fulfilled, (state, action) => {
                if (action.payload) {
                    state.text = action.payload;
                    const textLength = action.payload.length;
                    state.delta = +((1 / textLength) * 100).toFixed(2);
                }
                state.isLoading = false;
            })
            .addCase(getBestResults.fulfilled, (state, action) => {
                if (action.payload) {
                    state.bestSpeed = action.payload.speed;
                    state.bestAccuracy = action.payload.accuracy;
                }
            })
            .addCase(fetchTestText.rejected, (state, action) => {
                if (action.payload) state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(updateTestRecord.rejected, (state, action) => {
                if (action.payload) state.error = action.payload;
            });
    },
});

export default testSlice.reducer;
export const { setLang, setBestAccuracy, setBestSpeed } = testSlice.actions;
