import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = 'http://localhost:3009'

export const getChannels = createAsyncThunk('channels/getChannels',
    async (_,thunkAPI) => {
        try {
            const response = await axios.get(baseURL + '/channels')
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    })

export const postChannels = createAsyncThunk('channels/postChannels',
    async (Data,thunkAPI) => {
        try {
            const response = await axios.post(baseURL + '/channels', Data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    })

export const joinChannels = createAsyncThunk('channels/joinChannels',
    async (Data,thunkAPI) => {
        try {
            const response = await axios.put(baseURL + '/channels/join', Data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    })

export const leavingChannels = createAsyncThunk('channels/leavingChannels',
    async (Data,thunkAPI) => {
        try {
            const response = await axios.put(baseURL + '/channels/leaving', Data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    })

const initialState = {
    Channels: [],
    search: [],
    channelState: [],
    addChannel: null,
    Result: null,
    isLoading: false
}
const channelSlice = createSlice({
    name: 'channels',
    initialState,
    extraReducers: {
        [getChannels.pending]: (state,action) => {
            state.isLoading = true
        },
        [getChannels.fulfilled]: (state,action) => {
            state.isLoading = false
            state.Channels = action.payload
            state.channelState = action.payload
        },
        [getChannels.rejected]: (state,action) => {
            state.isLoading = false
        },

        [postChannels.pending]: (state,action) => {
            state.isLoading = true
        },
        [postChannels.fulfilled]: (state,action) => {
            state.isLoading = false
            state.addChannel = action.payload
        },
        [postChannels.rejected]: (state,action) => {
            state.isLoading = false
        },

        [joinChannels.pending]: (state,action) => {
            state.isLoading = true
        },
        [joinChannels.fulfilled]: (state,action) => {
            state.isLoading = false
            state.Result = action.payload
        },
        [joinChannels.rejected]: (state,action) => {
            state.isLoading = false
        },

        [leavingChannels.pending]: (state,action) => {
            state.isLoading = true
        },
        [leavingChannels.fulfilled]: (state,action) => {
            state.isLoading = false
            state.Result = action.payload
        },
        [leavingChannels.rejected]: (state,action) => {
            state.isLoading = false
        }
    },
    reducers: {
        Search: (state,action) => {
            const String = action.payload.charAt(0).toLowerCase() + action.payload.slice(1)
            state.search = state.Channels.filter(fl => fl.name.includes(String))
        },
        pushUser: (state,action) => {
            state.channelState = state.Channels.map(item => {
                return item._id === action.payload.idChannel ? (
                        item.users.push(action.payload.user)
                ) : (null)
            })
        },
    }
})
export default channelSlice.reducer
export const {Search,pushUser,pullUser} = channelSlice.actions