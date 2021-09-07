import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <span className='logo'>zStore</span>
      <NavLink to='/Home'>Home</NavLink>
      <NavLink to='/products'>Products</NavLink>
    </header>
  )
}
export default Header