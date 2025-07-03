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
    const [formData, setFormData] = React.useState<CreateBorrowDto>({
        book: book._id,
        quantity: 1,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((p) => ({
            ...p,
            [name]: name === 'quantity' ? Math.max(1, +value) : value,
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
            toast.success('Book borrowed successfully!');
            navigate('/borrow-summary');
        } catch (err: any) {
            toast.error(err?.data?.message || 'Error borrowing book');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <h3 className="text-lg font-medium ">
                    Borrow: {book.title}
                </h3>
                <p className="mt-1 text-sm ">
                    Available copies: {book.copies}
                </p>
            </div>

            <div>
                <label
                    htmlFor="quantity"
                    className="block text-sm font-medium "
                >
                    Quantity
                </label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    min="1"
                    max={book.copies}
                    className="input mt-1"
                />
            </div>

            <div>
                <label
                    htmlFor="dueDate"
                    className="block text-sm font-medium "
                >
                    Due Date
                </label>
                <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="input mt-1"
                />
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="btn btn-secondary"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!book.available}
                >
                    Borrow
                </button>
            </div>
        </form>
    );
};

export default BorrowForm; 