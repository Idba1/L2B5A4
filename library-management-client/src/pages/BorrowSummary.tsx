import { useGetBorrowSummaryQuery } from '@/redux/api/borrowApi';


const BorrowSummary= () => {
    const { data: summary = [], isLoading, error } = useGetBorrowSummaryQuery();

    if (isLoading) return <p>Loading summary…</p>;
    if (error) return <p>Error loading summary</p>;

    return (
        <div className=" shadow rounded-lg p-6">
            <h1 className="text-2xl font-semibold mb-6">Borrow Summary</h1>
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">ISBN</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Total Borrowed</th>
                    </tr>
                </thead>
                <tbody className=" divide-y divide-gray-300">
                    {summary.map((s) => (
                        <tr key={s.book.isbn}>
                            <td className="px-6 py-4">{s.book.title}</td>
                            <td className="px-6 py-4">{s.book.isbn}</td>
                            <td className="px-6 py-4">{s.totalQuantity}</td>
                        </tr>
                    ))}
                    {summary.length === 0 && (
                        <tr>
                            <td colSpan={3} className="text-center py-4 text-gray-500">
                                No books have been borrowed yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BorrowSummary;
