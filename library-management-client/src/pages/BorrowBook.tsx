import { useParams, Navigate } from 'react-router-dom';
import { bookApi } from '@/redux/api/BookApi';
import { borrowApi } from '@/redux/api/borrowApi';
import BorrowForm from '@/components/BorrowForm';

const BorrowBook= () => {
    const { id } = useParams<{ id: string }>();
    const { data: book, isLoading, error } = bookApi.useGetBookQuery(id!);
    const [createBorrow] = borrowApi.useCreateBorrowMutation();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-gray-600">Loading book...</div>
            </div>
        );
    }

    if (error || !book || !book.available) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Borrow Book</h1>
            <div className="shadow rounded-lg p-6">
                <BorrowForm book={book} onSubmit={createBorrow} />
            </div>
        </div>
    );
};

export default BorrowBook; 