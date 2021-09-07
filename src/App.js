import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/Home";
import Products from './components/Products'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Routes>

          <Route exact path='/Products' element={<Products />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/' element={<Home />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}
export default App;