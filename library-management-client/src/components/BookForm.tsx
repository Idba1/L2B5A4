import type { Book, CreateBookDto, Genre } from '@/redux/api/BookApi';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

interface Props {
    initialData?: Book;
    onSubmit: (d: CreateBookDto) => ReturnType<any>;
    submitLabel: string;
}

const genres: Genre[] = [
    'FICTION',
    'NON_FICTION',
    'SCIENCE',
    'HISTORY',
    'BIOGRAPHY',
    'FANTASY',
];

type BookFormState = Omit<CreateBookDto, 'copies'> & { copies: number | '' };

const BookForm: React.FC<Props> = ({ initialData, onSubmit, submitLabel }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState<BookFormState>({
        title: initialData?.title || '',
        author: initialData?.author || '',
        genre: (initialData?.genre as Genre) || 'FICTION',
        isbn: initialData?.isbn || '',
        description: initialData?.description || '',
        copies: initialData?.copies ?? '',
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === 'copies'
                    ? value === '' ? '' : Math.max(0, parseInt(value))
                    : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.author.trim()) {
            toast.warning('Title and Author are required');
            return;
        }

        const bookData: CreateBookDto = {
            ...formData,
            copies: Number(formData.copies) || 0,
        };

        try {
            await onSubmit(bookData).unwrap();

            await Swal.fire({
                title: 'Success!',
                text: `Book ${submitLabel === 'Update Book' ? 'updated' : 'created'} successfully!`,
                icon: 'success',
                confirmButtonColor: '#10B981',
            });

            navigate('/books');
        } catch (err: any) {
            toast.error(err?.data?.message || 'Error saving book');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 rounded-xl shadow-md bg-white dark:bg-gray-900">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
                {initialData ? 'Edit Book' : 'Add New Book'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Title
                    </label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full border-gray-300 dark:border-gray-700 bg-white dark:bg-black rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none p-2"
                        placeholder="Enter book title"
                    />
                </div>

                {/* Author */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Author
                    </label>
                    <input
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full border-gray-300 dark:border-gray-700 bg-white dark:bg-black rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none p-2"
                        placeholder="Enter author name"
                    />
                </div>

                {/* Genre */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Genre
                    </label>
                    <select
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="mt-1 w-full border-gray-300 dark:border-gray-700 bg-white dark:bg-black rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none p-2"
                    >
                        {genres.map((g) => (
                            <option key={g} value={g}>
                                {g.replace('_', ' ')}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ISBN */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        ISBN
                    </label>
                    <input
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full border-gray-300 dark:border-gray-700 bg-white dark:bg-black rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none p-2"
                        placeholder="e.g., 978-3-16-148410-0"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description
                    </label>
                    <textarea
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 w-full border-gray-300 dark:border-gray-700 bg-white dark:bg-black rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none p-2"
                        placeholder="Brief description of the book"
                    />
                </div>

                {/* Copies */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Number of Copies
                    </label>
                    <input
                        type="number"
                        name="copies"
                        min={0}
                        value={formData.copies}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full border-gray-300 dark:border-gray-700 bg-white dark:bg-black rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none p-2"
                        placeholder="Enter number of copies"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        type="button"
                        onClick={() => navigate('/books')}
                        className="px-4 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                        {submitLabel}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookForm;
