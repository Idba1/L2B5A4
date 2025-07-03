import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-system-one-weld.vercel.app/api' }),
    tagTypes: ['Book', 'Borrow'],
    endpoints: () => ({}),
}); 
