import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducer';

const store = configureStore({
    reducer: {
        recomm: counterReducer,
    },
});

export default store