import App from "@/App";
import BookDetails from "@/pages/BookDetails";
import BookList from "@/pages/BookList";
import CreateBook from "@/pages/CreateBook";
import EditBook from "@/pages/EditBook";

import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <BookList></BookList>
            },
            {
                path:"/books",
                element: <BookList></BookList>
            },
            {
                path: "/books/create",
                element: <CreateBook></CreateBook>
            },
            {
                path: "/books/:id",
                element: <BookDetails></BookDetails>
            },
            {
                path: "/edit-book/:id",
                element: <EditBook></EditBook>
            },
        ]
    },
]);

export default router;