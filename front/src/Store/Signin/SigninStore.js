import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = 'http://localhost:3009'

export const checkSignin = createAsyncThunk('signin/checkSignin',
    async (Data,thunkAPI) => {
        try {
            const response = await axios.post(baseURL + '/signin', Data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    })

const initialState = {
    Result: null,
    isLoading: false
}
const signinSlice = createSlice({
    name: 'signin',
    initialState,
    extraReducers: {
        [checkSignin.pending]: (state,action) => {
            state.isLoading = true
        },
        [checkSignin.fulfilled]: (state,action) => {
            state.isLoading = false
            state.Result = action.payload
        },
        [checkSignin.rejected]: (state,action) => {
            state.isLoading = false
        }
    }
})
export default signinSlice.reducer