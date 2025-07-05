import { Link } from 'react-router-dom';
import {
    useDeleteBookMutation,
    useGetBooksQuery,
} from '../redux/api/BookApi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import {
    Eye,
    Pencil,
    Trash,
    BookOpen,
    Plus,
} from 'lucide-react';

const BookList = () => {
    const { data: books = [], isLoading, error } = useGetBooksQuery();
    const [deleteBook] = useDeleteBookMutation();

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await deleteBook(id).unwrap();
                toast.success('Book deleted successfully');
                Swal.fire('Deleted!', 'The book has been deleted.', 'success');
            } catch {
                Swal.fire('Failed!', 'There was a problem deleting the book.', 'error');
            }
        }
    };

    if (isLoading) return <p className="text-center mt-10">Loading…</p>;
    if (error) return <p className="text-center mt-10 text-red-600">Error loading books</p>;

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">All Books</h1>
                <Link to="/create-book" className="btn btn-primary flex items-center gap-1">
                    <Plus className="w-4 h-4" />
                    Add Book
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto shadow rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50 dark:bg-black">
                        <tr>
                            {['Title', 'Author', 'Genre', 'ISBN', 'Copies', 'Status', 'Actions'].map((h) => (
                                <th
                                    key={h}
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-900">
                        {books.length > 0 ? (
                            books.map((book, idx) => (
                                <tr
                                    key={book._id}
                                    className={idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-black'}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link
                                            to={`/books/${book._id}`}
                                            className="text-primary-600 hover:text-primary-800 font-medium"
                                        >
                                            {book.title}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">{book.author}</td>
                                    <td className="px-6 py-4">{book.genre}</td>
                                    <td className="px-6 py-4">{book.isbn}</td>
                                    <td className="px-6 py-4">{book.copies}</td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 inline-flex text-xs font-semibold rounded-full ${book.available
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {book.available ? 'Available' : 'Unavailable'}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 text-sm flex items-center gap-3">
                                        <Link to={`/books/${book._id}`} title="View">
                                            <Eye className="w-5 h-5 text-blue-600 hover:text-blue-800 transition" />
                                        </Link>
                                        <Link to={`/edit-book/${book._id}`} title="Edit">
                                            <Pencil className="w-5 h-5 text-yellow-600 hover:text-yellow-800 transition" />
                                        </Link>
                                        <button onClick={() => handleDelete(book._id)} title="Delete">
                                            <Trash className="w-5 h-5 text-red-600 hover:text-red-800 transition" />
                                        </button>
                                        <Link
                                            to={`/borrow/${book._id}`}
                                            title="Borrow"
                                            className={book.available ? '' : 'pointer-events-none opacity-50'}
                                        >
                                            <BookOpen className="w-5 h-5 text-purple-600 hover:text-purple-800 transition" />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center py-6 text-gray-500">
                                    No books found. Please add some!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookList;
