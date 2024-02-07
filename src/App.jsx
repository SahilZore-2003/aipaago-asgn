import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import { useState } from "react"
import Users from "./pages/Users/Users"
import Create from "./pages/Create/Create"
import Update from "./pages/Update/Update"
import Navbar from "./components/Navbar/Navbar"

function App() {

  const [userAuth,setUserAuth] = useState(localStorage.getItem("auth"))

  const RequireAuth = ({ children }) => {
    return userAuth ? children : window.location.href = "/login"
  }

  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/users" element={<RequireAuth><Users/></RequireAuth>} />
        <Route path="/create" element={<RequireAuth><Create/></RequireAuth>} />
        <Route path="/update/:id" element={<RequireAuth><Update/></RequireAuth>} />
        <Route path="/login"  element={<Login setUserAuth={setUserAuth} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
