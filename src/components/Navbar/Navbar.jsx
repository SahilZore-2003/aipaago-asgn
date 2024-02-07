import React from 'react'
import {NavLink, useNavigate} from "react-router-dom"
import "./Navbar.scss"
const Navbar = () => {
    const navigate = useNavigate()
  return (
    <nav>
        <h2 onClick={()=>navigate("/")}>Alpaago</h2>
        <div className="links">
            <NavLink to={"/users"}>Users</NavLink>
        </div>
    </nav>
  )
}

export default Navbar
