import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

//--------api---------------
export const fetchQuestions=createAsyncThunk('/CRUD using Toolkit/fetchQuestions',async ({id})=>{
try{
    const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${id}&type=multiple`)
    console.log(`response ques`, response);
    const data = response.data.results;
    return data
}
catch(err){
    console.log(err)
}
})

//-----------Slice------------
const quizSlice=createSlice({
    name:'quiz',
    initialState:{
        questions:[],
        loading:true
    },
    reducers:{

    },
    extraReducers:{
        [fetchQuestions.pending]:(state,action)=>{
            console.log("pending",action)
            state.loading=true
        },
        [fetchQuestions.fulfilled]:(state,action)=>{
            console.log('fullfiled', action);
            state.questions = action.payload;
            state.loading = false;
        },
        [fetchQuestions.rejected]:(state,action)=>{
            console.log('rejected',action)
            state.loading=false
        }
    }
})

export default quizSlice.reducer;