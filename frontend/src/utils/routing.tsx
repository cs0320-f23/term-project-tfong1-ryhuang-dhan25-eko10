import { createBrowserRouter } from 'react-router-dom';
// import BadURL from '../pages/404';
import Start from '../pages/start';

import Root from '../layout/RootLayout';
import Results from '../pages/results';
import Recommended from '../pages/recommended';



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
                path:"results",
                element: <Results />
            },
            {
                path:"recommended",
                element: <Recommended />
            }
        ]

    }
])