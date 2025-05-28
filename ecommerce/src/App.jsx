import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar.jsx'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import kids_banner from "./Components/Assets/banner_kids.png"
import women_banner from './Components/Assets/banner_women.png'
import men_banner from './Components/Assets/banner_mens.png'
import Home from './Pages/Home.jsx'
import ShopCategory from './Pages/ShopCategory.jsx'
import Product from './Pages/Product.jsx'
import Cart from './Pages/Cart.jsx'
import Footer from './Components/Footer/Footer.jsx'
import LoginSignup from "./Pages/LoginSignup.jsx"

export default function App() {
  return (
    <>
      <div>
        <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/men" element={<ShopCategory  banner={men_banner} category="men" />} />
            <Route path="/woman" element={<ShopCategory  banner={women_banner} category="women" />} />
            <Route path="/kids" element={<ShopCategory  banner={kids_banner} category="kid" />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignup/>} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  )
}


