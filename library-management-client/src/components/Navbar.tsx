import { Link } from 'react-router-dom'
import { ModeToggle } from './mode-toggler'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50  shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-xl font-bold">
                            📚 Library
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/"
                            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition"
                        >
                            All Books
                        </Link>
                        <Link
                            to="/books/create"
                            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition"
                        >
                            Add Book
                        </Link>
                        <Link
                            to="/borrow-summary"
                            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition"
                        >
                            Borrow Summary
                        </Link>
                    </div>

                    {/* Right section (dark mode toggle + hamburger) */}
                    <div className="flex items-center space-x-4">
                        <ModeToggle />

                        {/* Hamburger Icon for mobile */}
                        <button
                            className="md:hidden p-2 focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-primary-600 text-white px-4 pb-4 space-y-2">
                    <Link
                        to="/"
                        className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                        onClick={() => setIsOpen(false)}
                    >
                        All Books
                    </Link>
                    <Link
                        to="/books/create"
                        className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                        onClick={() => setIsOpen(false)}
                    >
                        Add Book
                    </Link>
                    <Link
                        to="/borrow-summary"
                        className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                        onClick={() => setIsOpen(false)}
                    >
                        Borrow Summary
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar
