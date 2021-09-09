import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import API from '../API';
import { Context } from '../context';

const Header = () => {
  const [user] = useContext(Context);
  console.log('header says:', user)
  return (
    <header>
      <span className='logo'>zStore</span>
      <NavLink to='/Home'>Home</NavLink>
      <NavLink to='/Products'>Products</NavLink>


      {
        user.status === 'authenticated' ?
          (<>
            <NavLink to='/Cart'>Cart ({user.cart?.cartItems.length})</NavLink>
            <NavLink to='/Profile'>Profile</NavLink>
          </>
          )
          :
          (<>
            <NavLink to='/Login'>Login</NavLink>
            <NavLink to='/Register'>Register</NavLink>
          </>)
      }
      <button onClick={() => API.printAll()}>PrintAll</button>
    </header>
  )
}
export default Header