import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state, { payload }) => payload,
        clearUser: () => null,
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
