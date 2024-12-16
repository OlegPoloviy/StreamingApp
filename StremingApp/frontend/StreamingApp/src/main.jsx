import App from "./App.jsx"
import React from "react";
import {Provider} from "react-redux";
import {store} from "./store/index.jsx";
import ReactDOM from "react-dom"
import "./index.css"
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/Router.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </Provider>

);