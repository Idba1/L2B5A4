import type { Book } from '@/redux/api/BookApi';
import type { CreateBorrowDto } from '@/redux/api/borrowApi';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface BorrowFormProps {
    book: Book;
    onSubmit: (d: CreateBorrowDto) => Promise<any>;
}

const BorrowForm: React.FC<BorrowFormProps> = ({ book, onSubmit }) => {
    const navigate = useNavigate();

    const today = new Date().toISOString().split('T')[0];
    const defaultDue = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];

    const [formData, setFormData] = React.useState<CreateBorrowDto>({
        book: book._id,
        quantity: 1,
        dueDate: defaultDue,
    });

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: name === 'quantity' ? Math.max(1, +value) : value,
    //     }));
    // };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'quantity'
                ? value === '' ? '' : Math.max(1, +value)
                : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.quantity > book.copies) {
            toast.error('Quantity cannot exceed available copies');
            return;
        }

        try {
            await onSubmit(formData);
            toast.success('📚 Book borrowed successfully!');
            navigate('/borrow-summary');
        } catch (err: any) {
            toast.error(err?.data?.message || '❌ Error borrowing book');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-semibold mb-4">📘 Borrow Book</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Book Info */}
                <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                        {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        By {book.author}
                    </p>
                    <p className="text-sm mt-1">
                        Available Copies:{' '}
                        <span className="font-semibold">{book.copies}</span>
                    </p>
                </div>

                {/* Quantity */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Quantity
                    </label>
                    <input
                        autoFocus
                        type="number"
                        name="quantity"
                        min={1}
                        max={book.copies}
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        disabled={!book.available}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-60"
                    />
                </div>

                {/* Due Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Due Date
                    </label>
                    <input
                        type="date"
                        name="dueDate"
                        min={today}
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!book.available}
                        className={`px-4 py-2 rounded-md transition text-white ${book.available
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {book.available ? '📚 Borrow' : 'Not Available'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BorrowForm;
