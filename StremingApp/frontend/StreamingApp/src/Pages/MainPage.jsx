
import {Outlet} from "react-router-dom";
import {Navbar} from "../Components/Navbar.jsx";

export function MainPage() {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
}
