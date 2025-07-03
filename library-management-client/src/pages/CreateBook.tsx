import BookForm from '../components/BookForm';
import { bookApi } from '../redux/api/BookApi';

const CreateBook = () => {
    const [createBook] = bookApi.useCreateBookMutation();

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Add New Book</h1>
            <div className="shadow rounded-lg p-6">
                <BookForm onSubmit={createBook} submitLabel="Create Book" />
            </div>
        </div>
    );
};

export default CreateBook; 