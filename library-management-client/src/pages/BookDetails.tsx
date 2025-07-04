import { useParams, Link, Navigate } from 'react-router-dom';
import { bookApi } from '../redux/api/BookApi';

const BookDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data: book, isLoading, error } = bookApi.useGetBookQuery(id!);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-gray-600">Loading book details...</div>
            </div>
        );
    }

    if (error || !book) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">📖 Book Details</h1>
                <div className="flex gap-3 flex-wrap">
                    <Link
                        to={`/edit-book/${book._id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        ✏️ Edit Book
                    </Link>
                    <Link
                        to={`/borrow/${book._id}`}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                        📚 Borrow Book
                    </Link>
                    <Link
                        to="/"
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                    >
                        🔙 Back to Home
                    </Link>
                </div>

            </div>

            <div className=" shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-2xl font-semibold">{book.title || 'N/A'}</h2>
                    <p className="text-gray-600">By {book.author || 'Unknown Author'}</p>
                </div>

                <div className="divide-y">
                    <DetailRow label="Genre" value={book.genre} />
                    <DetailRow label="ISBN" value={book.isbn} />
                    <DetailRow label="Description" value={book.description} isMultiline />
                    <DetailRow label="Copies" value={book.copies?.toString()} />
                    <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                        <dd className="sm:col-span-2 mt-1 text-sm">
                            <span
                                className={`px-3 py-1 inline-flex text-sm font-medium rounded-full ${book.available
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}
                            >
                                {book.available ? 'Available' : 'Unavailable'}
                            </span>
                        </dd>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailRow = ({
    label,
    value,
    isMultiline = false,
}: {
    label: string;
    value?: string;
    isMultiline?: boolean;
}) => (
    <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd
            className={`sm:col-span-2 mt-1 text-sm ${isMultiline ? 'whitespace-pre-wrap' : ''
                }`}
        >
            {value || 'N/A'}
        </dd>
    </div>
);

export default BookDetails;
