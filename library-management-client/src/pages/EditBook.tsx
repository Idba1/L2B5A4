import { useParams, Navigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { bookApi } from '../redux/api/BookApi';

const EditBook= () => {
    const { id } = useParams<{ id: string }>();
    const { data: book, isLoading, error } = bookApi.useGetBookQuery(id!);
    const [updateBook] = bookApi.useUpdateBookMutation();

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-lg text-gray-600">Loading book...</p>
            </div>
        );

    if (error || !book) return <Navigate to="/books" replace />;

    const handleSubmit = (data: any) =>
        updateBook({ id: book._id, book: data });

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Edit Book</h1>
            <div className=" shadow rounded-lg p-6">
                <BookForm
                    initialData={book}
                    onSubmit={handleSubmit}
                    submitLabel="Update Book"
                />
            </div>
        </div>
    );
};

export default EditBook;