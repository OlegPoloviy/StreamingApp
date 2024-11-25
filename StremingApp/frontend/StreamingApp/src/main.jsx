import App from "./App.jsx"
import React from "react";
import ReactDOM from "react-dom"
import "./index.css"
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/Router.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}>
        <App />
    </RouterProvider>
);