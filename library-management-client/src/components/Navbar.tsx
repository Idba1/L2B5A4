import { Link } from 'react-router-dom';
import { ModeToggle } from './mode-toggler';

const Navbar = () => {
    return (
        <nav>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold">
                            📚 Library
                        </Link>
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link
                                to="/"
                                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                            >
                                All Books
                            </Link>
                            <Link
                                to="/books/create"
                                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                            >
                                Add Book
                            </Link>
                            <Link
                                to="/borrow-summary"
                                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                            >
                                Borrow Summary
                            </Link>
                        </div>
                    </div>
                    {/* Dark Mode Toggle */}
                    <ModeToggle />
                </div>

            </div>

        </nav>
    );
};

export default Navbar;
