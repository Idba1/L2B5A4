const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    © {currentYear} Library Management System. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
