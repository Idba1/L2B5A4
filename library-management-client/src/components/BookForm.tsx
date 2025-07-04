import type { Book, CreateBookDto, Genre } from '@/redux/api/BookApi';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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

const BookForm: React.FC<Props> = ({ initialData, onSubmit, submitLabel }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState<CreateBookDto>({
        title: initialData?.title || '',
        author: initialData?.author || '',
        genre: (initialData?.genre as Genre) || 'FICTION',
        isbn: initialData?.isbn || '',
        description: initialData?.description || '',
        copies: initialData?.copies || 1,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'copies' ? Math.max(0, parseInt(value) || 0) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.author.trim()) {
            toast.warning('Title and Author are required');
            return;
        }

        try {
            await onSubmit(formData).unwrap();
            toast.success(`Book ${submitLabel === 'Update Book' ? 'updated' : 'created'} successfully!`);
            navigate('/books');
        } catch (err: any) {
            toast.error(err?.data?.message || 'Error saving book');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6  rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">
                {initialData ? 'Edit Book' : 'Add New Book'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none p-2"
                        placeholder="Enter book title"
                    />
                </div>

                {/* Author */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Author</label>
                    <input
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full bg-white dark:bg-black border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none p-2"
                        placeholder="Enter author name"
                    />
                </div>

                {/* Genre */}
                <div>
                    <label className="block text-sm font-medium  text-gray-700">Genre</label>
                    <select
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="mt-1 bg-white dark:bg-black  w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none p-2"
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
                    <label className="block text-sm font-medium text-gray-700">ISBN</label>
                    <input
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none p-2"
                        placeholder="e.g., 978-3-16-148410-0"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none p-2"
                        placeholder="Brief description of the book"
                    />
                </div>

                {/* Copies */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Number of Copies</label>
                    <input
                        type="number"
                        name="copies"
                        min={0}
                        value={formData.copies}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-300 focus:outline-none p-2"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        type="button"
                        onClick={() => navigate('/books')}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
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
