import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = 'http://localhost:3009'

export const checkVerification = createAsyncThunk('verification/checkVerification',
    async (Data,thunkAPI) => {
        try {
            const response = await axios.post(baseURL + '/signin/checkResetPasswordAccount', Data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    })

export const checkData = createAsyncThunk('verification/checkData',
    async (Data,{rejectWithValue}) => {
        try{
            const response = await axios.post(baseURL + '/signin/Verification', Data)
            return response.data
        }catch (error){
            return rejectWithValue(error.message)
        }
    })

export const resetPassword = createAsyncThunk('verification/resetPassword',
    async (Data,{rejectWithValue}) => {
        try{
            const response = await axios.put(baseURL + '/signin/resetPassword', Data)
            return response.data
        }catch (error){
            return rejectWithValue(error.message)
        }
    })

const initialState = {
    Result: null,
    checkVerification: null,
    isLoading: false,
    resetPass: null
}
const verificationSlice = createSlice({
    name: 'verification',
    initialState,
    extraReducers: {
        [checkVerification.pending]: (state,action) => {
            state.isLoading = true
        },
        [checkVerification.fulfilled]: (state,action) => {
            state.isLoading = false
            state.Result = action.payload
        },
        [checkVerification.rejected]: (state,action) => {
            state.isLoading = false
        },

        [checkData.pending]: (state,action) => {
            state.isLoading = true
        },
        [checkData.fulfilled]: (state,action) => {
            state.isLoading = false
            state.Result = action.payload
        },
        [checkData.rejected]: (state,action) => {
            state.isLoading = false
        },

        [resetPassword.pending]: (state,action) => {
            state.isLoading = true
        },
        [resetPassword.fulfilled]: (state,action) => {
            state.isLoading = false
            state.checkVerification = action.payload
        },
        [resetPassword.rejected]: (state,action) => {
            state.isLoading = false
        },
    }
})
export default verificationSlice.reducer