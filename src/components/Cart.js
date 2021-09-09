import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context";

const Cart = () => {

  const [user] = useContext(Context);


  useEffect(() => {
    document.title = 'Cart';
  }, [])


  return (
    <div>
      {
        user.status === 'authenticated' &&
        <>
          Cart is :
          {JSON.stringify(user.user.cart)}
        </>
      }
    </div>
  )
}
export default Cart