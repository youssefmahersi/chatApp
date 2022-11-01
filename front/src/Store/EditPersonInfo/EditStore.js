import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const baseURL = 'http://localhost:3009'

export const postEdit = createAsyncThunk('edit/postEdit', 
    async (Data,thunkAPI) => {
        try{
            const response = await axios.put(baseURL + '/editInfo', Data)
            return response.data
        }catch (error){
            return thunkAPI.rejectWithValue(error.message)
        }
    })

const initialState = {
    Result: null
}
const editSlice = createSlice({
    name: 'edit',
    initialState,
    extraReducers: {
        [postEdit.pending]: (state,action) => {},
        [postEdit.fulfilled]: (state,action) => {
            state.Result = action.payload
        },
        [postEdit.rejected]: (state,action) => {},
    }
})


export default editSlice.reducer