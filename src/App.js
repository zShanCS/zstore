import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/Home";
import Products from './components/Products'
import Profile from './components/Profile'
import Cart from './components/Cart'
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import { Context } from "./context";
import Spinner from "./components/Spinner";
import API from "./API";

const PrivateRoute = (props) => {
  const [user] = useContext(Context)
  console.log('user status', user)

  if (user.status === 'authenticated') {
    return <Route {...props} />
  }
  else {
    return <Navigate to='/Login' />
  }
}

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/Products' element={<Products />} />
          <PrivateRoute path='/Profile' element={<Profile />} />
          <Route path='/Home' element={<Home />} />
          <PrivateRoute path='/Cart' element={<Cart />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route exact path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;