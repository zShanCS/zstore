import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context";
const Profile = () => {

  const [user, setUser] = useContext(Context);

  function handleLogout() {
    localStorage.removeItem('auth');
    setUser(undefined);
  }
  return (
    <div>
      {
        user ?
          <div>
            <p>Welcome To Your Profile {user.name}</p>
            <button onClick={() => handleLogout()} >Logout</button>
          </div>
          :
          <p>You are not logged in. Kindly <Link to='/Login'>Login</Link></p>
      }



    </div>
  )
}
export default Profile