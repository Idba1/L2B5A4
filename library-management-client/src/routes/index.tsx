import App from "@/App";
import BookList from "@/pages/BookList";
import CreateBook from "@/pages/CreateBook";

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
                path: "/books/create",
                element: <CreateBook></CreateBook>
            },
        ]
    },
]);

export default router;