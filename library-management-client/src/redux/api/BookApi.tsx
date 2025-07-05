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

export interface ListReq {
    page: number;
    limit: number;
}

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ListRes {
    data: Book[];
    pagination: Pagination;
}


export const bookApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createBook: builder.mutation<Book, CreateBookDto>({
            query: (body) => ({ url: '/books', method: 'POST', body }),
            transformResponse: (r: { success: boolean; data: Book }) => r.data,
            invalidatesTags: ['Book'],
        }),

        getBooks: builder.query<ListRes, ListReq>({
            query: ({ page, limit }) => `/books?page=${page}&limit=${limit}`,
            transformResponse: (r: {
                success: boolean;
                data: Book[];
                pagination: Pagination;
            }): ListRes => ({ data: r.data, pagination: r.pagination }),
            providesTags: ['Book'],
        }),

        getBook: builder.query<Book, string>({
            query: (id) => `/books/${id}`,
            transformResponse: (r: { success: boolean; data: Book }) => r.data,
            providesTags: ['Book'],
        }),

        updateBook: builder.mutation<
            Book,
            { id: string; book: Partial<CreateBookDto> }
        >({
            query: ({ id, book }) => ({ url: `/books/${id}`, method: 'PUT', body: book }),
            transformResponse: (r: { success: boolean; data: Book }) => r.data,
            invalidatesTags: ['Book'],
        }),

        deleteBook: builder.mutation<void, string>({
            query: (id) => ({ url: `/books/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Book'],
        }),
    }),
});

export const {
    useCreateBookMutation,
    useGetBooksQuery,
    useGetBookQuery,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = bookApi;
