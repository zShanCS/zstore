import React from 'react';
import { NavLink } from 'react-router-dom';
import API from '../API';

const Header = () => {
  return (
    <header>
      <span className='logo'>zStore</span>
      <NavLink to='/Home'>Home</NavLink>
      <NavLink to='/Register'>Register</NavLink>
      <NavLink to='/Products'>Products</NavLink>
      <NavLink to='/Cart'>Cart</NavLink>
      <NavLink to='/Profile'>Profile</NavLink>
      <NavLink to='/Login'>Login</NavLink>
      <button onClick={() => API.printAll()}>PrintAll</button>
    </header>
  )
}
export default Header