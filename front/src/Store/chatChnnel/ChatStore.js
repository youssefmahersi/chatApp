import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = 'http://localhost:3009'

export const getChat = createAsyncThunk('chat/getChat',
    async (_,thunkAPI) => {
        try {
            const response = await axios.get(baseURL + '/chat')
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    })

export const postChat = createAsyncThunk('chat/postChat',
    async (Data,thunkAPI) => {
        try {
            const response = await axios.post(baseURL + '/chat', Data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    })

const initialState = {
    Chat: [],
    Result: [],
    isLoading: false
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    extraReducers: {
        [getChat.pending]: (state,action) => {
            state.isLoading = true
        },
        [getChat.fulfilled]: (state,action) => {
            state.isLoading = false
            state.Chat = action.payload
        },
        [getChat.rejected]: (state,action) => {
            state.isLoading = false
        },

        [postChat.pending]: (state,action) => {
            state.isLoading = true
        },
        [postChat.fulfilled]: (state,action) => {
            state.isLoading = false
            state.Result = action.payload
        },
        [postChat.rejected]: (state,action) => {
            state.isLoading = false
        },
    },
})
export default chatSlice.reducer
