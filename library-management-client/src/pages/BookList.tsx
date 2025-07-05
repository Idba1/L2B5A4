import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Eye, Pencil, Trash, BookOpen, Plus } from 'lucide-react';

import {
    useGetBooksQuery,
    useDeleteBookMutation,
} from '../redux/api/BookApi';

const PAGE_SIZE = 10;

export default function BookList() {
    const [page, setPage] = useState(1);

    const { data, isLoading, error, refetch, isFetching } = useGetBooksQuery({
        page,
        limit: PAGE_SIZE,
    });

    const books = data?.data ?? [];
    const pagination = data?.pagination ?? { totalPages: 1 };
    const totalPages = pagination.totalPages;

    const [deleteBook] = useDeleteBookMutation();

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this book!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (!result.isConfirmed) return;

        try {
            await deleteBook(id).unwrap();
            toast.success('Book deleted');
            if (books.length === 1 && page > 1) setPage((p) => p - 1);
            else refetch();
        } catch {
            toast.error('Deletion failed');
        }
    };

    if (isLoading) return <p className="text-center mt-10">Loading…</p>;
    if (error) return <p className="text-center mt-10 text-red-600">Failed to load books</p>;

    return (
        <div className="space-y-6">
            {/* header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">All Books</h1>
                <Link to="/create-book" className="btn btn-primary flex items-center gap-1">
                    <Plus className="w-4 h-4" /> Add Book
                </Link>
            </div>

            {/* table */}
            <div className="overflow-x-auto shadow rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50 dark:bg-black">
                        <tr>
                            {['Title', 'Author', 'Genre', 'ISBN', 'Copies', 'Status', 'Actions'].map((h) => (
                                <th key={h}
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-900">
                        {books.length ? books.map((book, i) => (
                            <tr key={book._id}
                                className={i % 2 === 0 ? 'bg-white dark:bg-gray-900'
                                    : 'bg-gray-50 dark:bg-black'}>
                                <td className="px-6 py-4">
                                    <Link to={`/books/${book._id}`}
                                        className="text-primary-600 hover:text-primary-800 font-medium">
                                        {book.title}
                                    </Link>
                                </td>
                                <td className="px-6 py-4">{book.author}</td>
                                <td className="px-6 py-4">{book.genre}</td>
                                <td className="px-6 py-4">{book.isbn}</td>
                                <td className="px-6 py-4">{book.copies}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 text-xs font-semibold rounded-full
                                    ${book.available ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'}`}>
                                        {book.available ? 'Available' : 'Unavailable'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex gap-3 text-sm">
                                    <Link to={`/books/${book._id}`}><Eye className="w-5 h-5 text-blue-600" /></Link>
                                    <Link to={`/edit-book/${book._id}`}><Pencil className="w-5 h-5 text-yellow-600" /></Link>
                                    <button onClick={() => handleDelete(book._id)}>
                                        <Trash className="w-5 h-5 text-red-600" />
                                    </button>
                                    <Link to={`/borrow/${book._id}`}
                                        className={book.available ? '' : 'pointer-events-none opacity-50'}>
                                        <BookOpen className="w-5 h-5 text-purple-600" />
                                    </Link>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={7} className="text-center py-6 text-gray-500">
                                    No books found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                    <button
                        disabled={page === 1 || isFetching}
                        className="btn btn-sm"
                        onClick={() => setPage((p) => p - 1)}>
                        Prev
                    </button>

                    {Array.from({ length: totalPages }).map((_, idx) => (
                        <button
                            key={idx + 1}
                            className={`btn btn-sm ${page === idx + 1 ? 'btn-primary' : 'btn-outline'}`}
                            disabled={isFetching}
                            onClick={() => setPage(idx + 1)}>
                            {idx + 1}
                        </button>
                    ))}

                    <button
                        disabled={page === totalPages || isFetching}
                        className="btn btn-sm"
                        onClick={() => setPage((p) => p + 1)}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
