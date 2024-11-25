import {MainPage} from "./Pages/MainPage.jsx";
import {Outlet} from "react-router-dom";
import {Navbar} from "./Components/Navbar.jsx"
import './App.css'

function App() {


  return (
    <>
      <div>
          <Navbar/>
          <Outlet/>
      </div>
    </>
  )
}

export default App
