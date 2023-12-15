import { createBrowserRouter } from 'react-router-dom';
// import BadURL from '../pages/404';
import Start from '../pages/start';

import Root from '../layout/RootLayout';
import Bookmark from '../pages/bookmark';
import Recommended from '../pages/recommended';
import Research_display from '../pages/research_display';
import { useState } from "react";

const [paper_title, setTitle] = useState<string>("");
const [recommenders, setRecommenders] = useState<string|string[][]>("");


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
                element: <Recommended recommenders={recommenders} setRecommenders={setRecommenders}/>
            },
            {
                path:"research_display",
                element: <Research_display />
            }
        ]

    }
])