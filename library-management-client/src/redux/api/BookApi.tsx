import { baseApi } from './BaseApi';

export type Genre =
    | 'FICTION'
    | 'NON_FICTION'
    | 'SCIENCE'
    | 'HISTORY'
    | 'BIOGRAPHY'
    | 'FANTASY';

export interface Book {
    _id: string;
    title: string;
    author: string;
    genre: Genre;
    isbn: string;
    description: string;
    copies: number;
    available: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBookDto {
    title: string;
    author: string;
    genre: Genre;
    isbn: string;
    description: string;
    copies: number;
}

export const bookApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query<Book[], void>({
            query: () => '/books',
            transformResponse: (r: {
                success: boolean;
                data: Book[];
            }) => r.data,
            providesTags: ['Book'],
        }),

    }),
});

export const {
    useGetBooksQuery,
} = bookApi;
