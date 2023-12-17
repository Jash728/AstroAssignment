import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const astrologersApi = createApi({
    reducerPath: 'astrologersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    endpoints: (builder) => ({
        createAstrologer: builder.mutation({
            query: (newAstrologer) => ({
                url: '/register',
                method: 'POST',
                body: newAstrologer,
            }),
        }),
    }),
});

export const { useCreateAstrologerMutation } = astrologersApi;