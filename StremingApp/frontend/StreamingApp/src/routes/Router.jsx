import {createBrowserRouter} from "react-router-dom";
import {MainPage} from "../Pages/MainPage.jsx";
import App from "../App.jsx";
import {RegisterPage} from "../Pages/RegisterPage.jsx";
import {LoginPage} from "../Pages/LoginPage.jsx";
import {MainPage as UserAccount} from "../Pages/user/MainPage.jsx"

export const router = createBrowserRouter([
    {
        path:"/",
        Component:App,
        children:[
            {
                path:"/",
                Component: MainPage
            },
            {
                path: '/userAccount',
                Component: UserAccount
            }

        ]

    },
    {
        path: "/register",
        Component: RegisterPage
    },
    {
        path: "/login",
        Component: LoginPage
    }
])
