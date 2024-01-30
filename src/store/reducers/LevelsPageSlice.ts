import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILevels, ILevelsPageState, IPractice } from "../../models/types";

const initialState: ILevelsPageState = {
    layoutLang: "ru",
    levels: [],
    practice: [],
    levelsIsFetching: false,
    practiceIsFetching: false,
};
export interface IPaylodLevels {
    levels: ILevels[];
}
export interface IPaylodPractice {
    practiceLevels: IPractice[];
}

export const LevelsPageSlice = createSlice({
    name: "levels-page",
    initialState,
    reducers: {
        setLevels(
            state: ILevelsPageState,
            action: PayloadAction<IPaylodLevels>
        ) {
            state.levels = action.payload.levels;
        },
        setLevelsFetching(
            state: ILevelsPageState,
            action: PayloadAction<boolean>
        ) {
            state.levelsIsFetching = action.payload;
        },
        setPractice(
            state: ILevelsPageState,
            action: PayloadAction<IPaylodPractice>
        ) {
            state.practice = action.payload.practiceLevels;
        },
        setPracticeFetching(
            state: ILevelsPageState,
            action: PayloadAction<boolean>
        ) {
            state.practiceIsFetching = action.payload;
        },
        
        setLayoutLang(state: ILevelsPageState, action: PayloadAction<string>) {
            state.layoutLang = action.payload;
        },
    },
});
export default LevelsPageSlice.reducer;
export const {
    setLevels,
    setLevelsFetching,
    setPractice,
    setPracticeFetching,
    setLayoutLang,
} = LevelsPageSlice.actions;
