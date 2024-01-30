import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LevelsPageSlice from "./reducers/LevelsPageSlice";
import UserSlice from "./reducers/UserSlice";
import SingleLevelReducer from "./reducers/SingleLevelSclice";
import testReducer from "./reducers/TestSclice";
import profileReducer from './reducers/ProfileSlice'
import faqReducer from "./reducers/FaqSlice";

const rootReducer = combineReducers({
    levelsPage: LevelsPageSlice,
    singleLevel: SingleLevelReducer,
    testing: testReducer,
    user: UserSlice,
    profilePage: profileReducer,
    theoryFaq: faqReducer,
});

export const store = configureStore({
    devTools: true,
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
