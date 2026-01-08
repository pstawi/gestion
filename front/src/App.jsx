import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import NavBar from './components/NavBar.jsx'
import Admin from './pages/Admin.jsx'

export default function App(){
  return (

    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>

  )
}