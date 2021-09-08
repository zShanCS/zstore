import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/Home";
import Products from './components/Products'
import Profile from './components/Profile'
import Cart from './components/Cart'
import Register from "./components/Register";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Routes>

          <Route path='/Products' element={<Products />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/' element={<Home />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}
export default App;