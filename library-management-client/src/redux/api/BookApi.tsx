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

        // create
        createBook: builder.mutation<Book, CreateBookDto>({
            query: (payload) => ({
                url: '/books',
                method: 'POST',
                body: payload,
            }),
            transformResponse: (r: {
                success: boolean;
                data: Book;
            }) => r.data,
            invalidatesTags: ['Book'],
        }),


        // all book list
        getBooks: builder.query<Book[], void>({
            query: () => '/books',
            transformResponse: (r: {
                success: boolean;
                data: Book[];
            }) => r.data,
            providesTags: ['Book'],
        }),

        // specific book
        getBook: builder.query<Book, string>({
            query: (id) => `/books/${id}`,
            transformResponse: (r: {
                success: boolean;
                data: Book;
            }) => r.data,
            providesTags: ['Book'],
        }),

        // edit
        updateBook: builder.mutation<
            Book,
            { id: string; book: Partial<CreateBookDto> }
        >({
            query: ({ id, book }) => ({
                url: `/books/${id}`,
                method: 'PUT',
                body: book,
            }),
            transformResponse: (r: {
                success: boolean;
                data: Book;
            }) => r.data,
            invalidatesTags: ['Book'],
        }),

        // delete
        deleteBook: builder.mutation<void, string>({
            query: (id) => ({
                url: `/books/${id}`,
                method: 'DELETE',
            }),
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
