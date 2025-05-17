import httpBaseQuery from '@/utils/httpBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
export const querySlice = createApi({
  reducerPath: 'auth',
  baseQuery: httpBaseQuery(),
  endpoints: builder => ({
    getUserInfo: builder.query({
      query: () => '/system/getInfo',
      providesTags: ['User'],
    }),
    getRouters: builder.query({
      query: () => '/menu',
      providesTags: ['Menu'],
    }),
  }),
});

export const { useGetUserInfoQuery, useGetRoutersQuery } = querySlice;
