import React, { useContext, useEffect, useState } from "react";
import API from "../API";
import { Context } from "../context";

const Cart = () => {
  const [user] = useContext(Context);
  const [cart, setCart] = useState()
  const [error, setError] = useState(false)
  useEffect(() => {
    document.title = 'Cart';
  }, [])
  useEffect(() => {
    let isSubscribed = true;
    (
      async () => {
        const cartRes = await API.getCart(localStorage.getItem('auth'))
        console.log(cartRes)
        if (cartRes.status === 'success' && isSubscribed) {
          setCart(cartRes.cart)
        }
        else {
          setError(true);
        }
      }
    )();
    return () => { isSubscribed = false }
  }, [])

  if (error) return <div>Soemthing went wrong</div>
  return (
    <div>
      {
        user &&
        <>
          Cart is :
          {JSON.stringify({ cart })}
        </>
      }
    </div>
  )
}
export default Cart