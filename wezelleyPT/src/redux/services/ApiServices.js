import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'universal-cookie';

// // Obtener el token por cookies
const cookies = new Cookies();

export const wellezyApi = createApi({
    reducerPath: 'wellezyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/api/',
        prepareHeaders: (headers, { getState }) => {
            const token = cookies.get('authToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        searchFlights: builder.mutation({
            query: (post) => ({
                url: '/flights',
                method: 'POST',
                body: post,
            }),
        }),
        searchAirports: builder.mutation({
            query: (code) => ({
                url: `/airports/${code}`,
                method: 'POST',
            }),
        }),
        reserves: builder.mutation({
            query: ({ body, id_user }) => ({
                url: `/reserves/${id_user}`,
                method: 'POST',
                body: body
            }),
        }),
        userRegister: builder.mutation({
            query: (body) => ({
                url: `/register`,
                method: 'POST',
                body: body
            }),
        }),
        userLogin: builder.mutation({
            query: (body) => ({
                url: `/login`,
                method: 'POST',
                body: body
            }),
        }),
        userLogout: builder.mutation({
            query: () => ({
                url: `/logout`,
                method: 'POST',
            }),
        }),
        userData: builder.query({
            query: () => '/user',
        }),
        userReserves: builder.query({
            query: () => '/reserves',
        }),
    }),
})

export const { useSearchFlightsMutation, useSearchAirportsMutation, useUserRegisterMutation, useUserLoginMutation, useUserLogoutMutation, useReservesMutation, useUserDataQuery, useUserReservesQuery } = wellezyApi;