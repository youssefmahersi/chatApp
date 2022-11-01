import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = 'http://localhost:3009'

export const getUsers = createAsyncThunk('signup/getUsers',
    async (_,{rejectWithValue}) => {
        try{
            const response = await axios.get(baseURL + '/signup')
            return response.data
        }catch (error){
            return rejectWithValue(error.message)
        }
    })

export const postSignup = createAsyncThunk('signup/postSignup',
    async (Data,thunkAPI) => {
        try {
            const response = await axios.post(baseURL + '/signup', Data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    })

const initialState = {
    users: [],
    Result: null,
    isLoading: false
}
const signupSlice = createSlice({
    name: 'signup',
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
        },

        [postSignup.pending]: (state,action) => {
            state.isLoading = true
        },
        [postSignup.fulfilled]: (state,action) => {
            state.isLoading = false
            state.Result = action.payload
        },
        [postSignup.rejected]: (state,action) => {
            state.isLoading = false
        }
    }
})
export default signupSlice.reducer