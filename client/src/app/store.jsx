import { configureStore } from '@reduxjs/toolkit';
import { astrologersApi } from '../services/astrologers';

export const store = configureStore({
    reducer: {
        [astrologersApi.reducerPath]: astrologersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(astrologersApi.middleware),
});

export default store;