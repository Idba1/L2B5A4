import App from "@/App";
import AllBooks from "@/pages/AllBooks";
import CreateBook from "@/pages/CreateBook";

import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <AllBooks></AllBooks>
            },
            {
                path: "/books/create",
                element: <CreateBook></CreateBook>
            },
        ]
    },
]);

export default router;