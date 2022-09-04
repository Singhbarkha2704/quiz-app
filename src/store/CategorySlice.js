import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategory = createAsyncThunk('/fetchCategory', async () => {
    try {
        const result = await axios.get(`https://opentdb.com/api_category.php`)
        const data = await result.data.trivia_categories
        console.log('data',data);
        return data
    }
    catch (err) {
        console.log(err)
    }
});

const categorySlice=createSlice({
    name:'category',
    initialState:{
        category: [],
        loading: true,
        allCategory:{}
    },
    reducers:{

    },
    extraReducers:{
       
        [fetchCategory.fulfilled]:(state,action)=>{
            console.log('fullfiled', action)
            state.category=action.payload 
            state.loading=false
        }
       
    }
})

export const showAllCategory = state => state.category.allCategory;

export default categorySlice.reducer;