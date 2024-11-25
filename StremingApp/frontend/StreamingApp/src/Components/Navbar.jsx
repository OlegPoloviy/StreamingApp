import { NavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "../Styles/navbar.scss";

export function Navbar() {
    return (
        <>
            <div className="navbar">
                <div className="navbar-logo">
                    <h2 className="navbar-logo-text"><b>Streaming</b> App</h2>
                </div>
                <ul className="navbar-list">
                    <li><NavLink to="/new-movies" style={{color:"black",textDecoration:"none"}}>New movies</NavLink></li>
                    <li><NavLink to="/genre"  style={{color:"black",textDecoration:"none"}}>Genre</NavLink></li>
                    <li><NavLink to="/movies"  style={{color:"black",textDecoration:"none"}}>Movies</NavLink></li>
                    <li><NavLink to="/tv-series"  style={{color:"black",textDecoration:"none"}}>Tv series</NavLink></li>
                </ul>
                <div className="navbar-account-icon">
                    <NavLink to={"/register"}>
                        <AccountCircleIcon style={{ fontSize: 40, color: 'black',cursor: "pointer" }} />
                    </NavLink>
                </div>
            </div>
        </>
    );
}
