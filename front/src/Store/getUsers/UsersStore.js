import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = 'http://localhost:3009'

export const getUsers = createAsyncThunk('getUsers/getUsers',
    async (Data,thunkAPI) => {
        try {
            const response = await axios.get(baseURL + '/signin')
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    })

const initialState = {
    users: [],
    isLoading: false
}
const signinSlice = createSlice({
    name: 'getUsers',
    initialState,
    extraReducers: {
        [getUsers.pending]: (state,action) => {
            state.isLoading = true
        },
        [getUsers.fulfilled]: (state,action) => {
            state.isLoading = false
            state.users = action.payload
        },
        [getUsers.rejected]: (state,action) => {
            state.isLoading = false
        }
    }
})
export default signinSlice.reducer