import React, { useEffect, useRef, useState } from "react";
import API from "../API";
import Spinner from "./Spinner";
const Products = () => {

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const isSubscribed = useRef(true);

  useEffect(() => {
    document.title = 'Products';
  }, [])

  async function fetchItems() {
    isSubscribed.current = true;
    setLoading(true);
    setError(false);

    const res = await API.fetchItems();
    console.log(res);
    if (res.status === 'success' && isSubscribed.current) {
      setItems(res.items);
      setLoading(false);
    }
    else {
      if (isSubscribed.current) {
        setError(true);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchItems();
    return () => { isSubscribed.current = false; }
  }, [])

  function handleAddToCart(e, id) {
    const target = e.currentTarget
    target.innerText = 'Adding'
    API.addToCart(localStorage.getItem('auth'), id, 4)
      .then(res => {
        console.log(res)
        if (res.status === 'success')
          target.innerText = 'done'
        else
          target.innerText = 'try again'
      })
  }

  const itemList = items.map(i => (
    <li key={i.id}>

      <p>
        {i.name} - {i.price}
        <button
          onClick={(e) => {
            handleAddToCart(e, i.id)
          }}>
          {'Add To Cart'}
        </button>
      </p>

    </li>
  ))

  if (error) return <div>Something went wrong. <button onClick={() => { fetchItems() }} >Refresh</button> </div>
  if (loading) return <Spinner />
  return (
    <div>
      <h2>Products</h2>
      {
        <>
          {JSON.stringify(items)}
          <ul>
            {
              itemList
            }
          </ul>
        </>
      }


    </div>
  )
}
export default Products