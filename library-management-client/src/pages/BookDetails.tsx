import React from 'react';
import { useParams,  Navigate } from 'react-router-dom';
import { bookApi } from '../redux/api/BookApi';

const BookDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: book, isLoading, error } = bookApi.useGetBookQuery(id!);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-gray-600">Loading book...</div>
            </div>
        );
    }

    if (error || !book) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold ">Book Details</h1>

            </div>

            <div className=" shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium ">
                        {book.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm ">
                        By {book.author}
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium ">Genre</dt>
                            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                                {book.genre}
                            </dd>
                        </div>
                        <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium ">ISBN</dt>
                            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                                {book.isbn}
                            </dd>
                        </div>
                        <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium ">Description</dt>
                            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                                {book.description}
                            </dd>
                        </div>
                        <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium ">Copies</dt>
                            <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2">
                                {book.copies}
                            </dd>
                        </div>
                        <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium ">Status</dt>
                            <dd className="mt-1 sm:mt-0 sm:col-span-2">
                                <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${book.available
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}
                                >
                                    {book.available ? 'Available' : 'Unavailable'}
                                </span>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default BookDetails; 