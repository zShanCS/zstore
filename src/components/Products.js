import React, { useEffect, useState } from "react";
import API from "../API";
import Spinner from "./Spinner";
const Products = () => {

  const [items, setItems] = useState([]);


  useEffect(() => {
    document.title = 'Products';
  }, [])

  useEffect(() => {
    let isSubscribed = true;
    (
      async () => {
        const res = await API.fetchItems();
        console.log(res);
        if (res.status === 'success' && isSubscribed)
          setItems(res.items);
      }
    )()
    return () => { isSubscribed = false; }
  }, [])

  function handleAddToCart(e, id) {
    const target = e.currentTarget
    target.innerText = 'Adding'
    API.addToCart(localStorage.getItem('auth'), id, 4)
      .then(res => {
        console.log(res)
        target.innerText = 'done'
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

  return (
    <div>
      <h2>Products</h2>
      {
        items.length < 1
          ?
          <Spinner />
          :
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