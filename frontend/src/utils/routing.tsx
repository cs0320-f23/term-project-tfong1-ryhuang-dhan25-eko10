import { createBrowserRouter } from 'react-router-dom';
// import BadURL from '../pages/404';
import Start from '../pages/start';

import Root from '../layout/RootLayout';
import Bookmark from '../pages/bookmark';
import Recommended from '../pages/recommended';
import Research_display from '../pages/research_display';



export const router = createBrowserRouter([
    {
        path: "/", 
        element: <Root />,
        // errorElement: <BadURL/>,
        children: [
            {
                index: true,
                element: <Start/>
            },
            {
                path:"bookmark",
                element: <Bookmark />
            },
            {
                path:"recommended",
                element: <Recommended />
            },
            {
                path:"research_display",
                element: <Research_display />
            }
        ]

    }
])