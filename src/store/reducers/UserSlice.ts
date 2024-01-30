import { PayloadAction, createSlice } from "@reduxjs/toolkit"
export interface IUser {
    name: string | null,
    email: string | null,
    img: string | null,
    uid: string | null,
}

const initialState: IUser = {
    name: null,
    email: null,
    img: null,
    uid: null,

}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>){
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.img = action.payload.img;
            state.uid = action.payload.uid;
        },
        removeUser(state){
            state.name = null;
            state.email = null;
            state.img = null;
            state.uid = null;
        }
    }
})

export default userSlice.reducer
export const {setUser, removeUser} = userSlice.actions;