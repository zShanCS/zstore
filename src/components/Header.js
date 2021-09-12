import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../context';

const Header = () => {
  const [user] = useContext(Context);
  return (
    <header>
      <span className='logo'>zStore</span>
      <NavLink to='/Home'>Home</NavLink>
      <NavLink to='/Products'>Products</NavLink>
      {
        user ?
          (<>
            <NavLink to='/Cart'>Cart ({user.user?.cart.cartItems.length})</NavLink>
            <NavLink to='/Profile'>Profile</NavLink>
          </>
          )
          :
          (<>
            <NavLink to='/Login'>Login</NavLink>
            <NavLink to='/Register'>Register</NavLink>
          </>)
      }
      <button onClick={() => {
        let u = localStorage.getItem('auth')
        console.log(u)
      }
      }

      >PrintAll</button>
    </header>
  )
}
export default Header