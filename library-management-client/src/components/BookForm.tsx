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
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === 'copies' ? Math.max(0, parseInt(value) || 0) : (value as any),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await onSubmit(formData).unwrap(); 
            toast.success('Book saved successfully!');
            navigate('/books');
        } catch (err: any) {
            toast.error(err?.data?.message || 'Error saving book');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                    className="input mt-1 w-full"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Author */}
            <div>
                <label className="block text-sm font-medium">Author</label>
                <input
                    className="input mt-1 w-full"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Genre */}
            <div>
                <label className="block text-sm font-medium">Genre</label>
                <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className="input mt-1 w-full"
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
                <label className="block text-sm font-medium">ISBN</label>
                <input
                    className="input mt-1 w-full"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    name="description"
                    rows={4}
                    className="input mt-1 w-full"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            {/* Copies */}
            <div>
                <label className="block text-sm font-medium">Copies</label>
                <input
                    type="number"
                    min={0}
                    name="copies"
                    className="input mt-1 w-full"
                    value={formData.copies}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={() => navigate('/books')}
                    className="btn btn-secondary"
                >
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    {submitLabel}
                </button>
            </div>
        </form>
    );
};

export default BookForm;
