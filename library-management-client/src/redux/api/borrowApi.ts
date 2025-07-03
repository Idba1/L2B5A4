import { baseApi } from "./BaseApi";
import type { Book } from "./BookApi";

export interface Borrow {
    _id: string;
    book: Book;
    quantity: number;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBorrowDto {
    book: string;
    quantity: number;
    dueDate: string;
}

export interface BorrowSummary {
    book: { title: string; isbn: string };
    totalQuantity: number;
}

export const borrowApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // borrow a book
        createBorrow: builder.mutation<Borrow, CreateBorrowDto>({
            query: (payload) => ({
                url: '/borrow',
                method: 'POST',
                body: payload,
            }),
            transformResponse: (r: { success: boolean; data: Borrow }) => r.data,
            invalidatesTags: ['Borrow', 'Book'],
        }),


        getBorrowSummary: builder.query<BorrowSummary[], void>({
            query: () => '/borrow',
            transformResponse: (r: {
                success: boolean;
                data: BorrowSummary[];
            }) => r.data,
            providesTags: ['Borrow'],
        }),
    }),
});

export const {
    useCreateBorrowMutation,
    useGetBorrowSummaryQuery,
} = borrowApi;
