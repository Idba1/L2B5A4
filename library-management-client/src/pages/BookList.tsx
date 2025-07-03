import { Link } from 'react-router-dom';
import {
    useGetBooksQuery,
} from '../redux/api/BookApi';

const BookList = () => {
    const { data: books = [], isLoading, error } = useGetBooksQuery();

    if (isLoading) return <p className="text-center mt-10">Loading…</p>;
    if (error) return <p className="text-center mt-10 text-red-600">Error</p>;

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Books</h1>
                <Link to="/books/create" className="btn btn-primary">
                    Add New Book
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto  shadow rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="">
                        <tr>
                            {['Title', 'Author', 'Genre', 'ISBN', 'Copies', 'Status', 'Actions'].map((h) => (
                                <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className=" divide-y divide-gray-200">
                        {books.map((book) => (
                            <tr key={book._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link to={`/books/${book._id}`} className="text-primary-600 hover:text-primary-900">
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
                                        className={`px-2 inline-flex text-xs font-semibold rounded-full ${book.available ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        {book.available ? 'Available' : 'Unavailable'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {books.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-6 text-gray-500">
                                    No books found.
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
