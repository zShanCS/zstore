import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context";

const Cart = () => {

  const [user] = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) { navigate('/Login') };
  }, [user, navigate]);


  return (
    <div>
      {
        user &&
        <>
          Cart is :
          {JSON.stringify(user.cart)}
        </>
      }
    </div>
  )
}
export default Cart