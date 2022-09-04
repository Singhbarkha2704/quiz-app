import { configureStore } from "@reduxjs/toolkit";
import quizReducer from './QuizSlice';
import categoryReducer from './CategorySlice';

const store = configureStore({
    reducer: {
        quiz: quizReducer,
        category:categoryReducer
    }
});

export default store;