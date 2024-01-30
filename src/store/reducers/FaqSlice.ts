import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IFaqItem, IFaqSlice } from "../../models/types"
import { AppDispatch } from "../store"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";


export const getTheroyFaqs = createAsyncThunk<void, undefined, {dispatch: AppDispatch}>(
    'faqSlice/getTheroyFaqs',
    async function (_, thunkAPI) {
        const levelsRef = doc(db, "theoryFaq", `/faqs`);
        const snap = await getDoc(levelsRef);
        const faqs:IFaqItem[] = snap.data()?.arr;
        thunkAPI.dispatch(setFaqs(faqs));
    }
)

export const getTestFaqs = createAsyncThunk<void, undefined, {dispatch: AppDispatch}>(
    'faqSlice/getTestFaqs',
    async function (_, thunkAPI) {
        const levelsRef = doc(db, "testFAQ", `/faqs`);
        const snap = await getDoc(levelsRef);
        const faqs:IFaqItem[] = snap.data()?.arr;
        thunkAPI.dispatch(setFaqs(faqs));
    }
)

const initialState: IFaqSlice = {
    faqs: [],
}

export const faqSlice = createSlice({
    name: 'faqSlice',
    initialState,
    reducers: {
        setFaqs(state, action: PayloadAction<IFaqItem[]>){
            state.faqs = action.payload;
        }
    }
})

export default faqSlice.reducer;
export const {setFaqs} = faqSlice.actions