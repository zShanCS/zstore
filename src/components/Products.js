import React, { useEffect, useState } from "react";
import API from "../API";
import Spinner from "./Spinner";
const Products = () => {

  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Products';
  }, [])

  useEffect(() => {
    let isSubscribed = true;
    (
      async () => {
        const res = await API.fetchItems();
        console.log(res);
        if (res.status === 'success')
          if (isSubscribed) setItems(res.items);
      }
    )()
    return () => { isSubscribed = false; console.log('produs subscription cancelled') }
  }, [])

  function handleAddToCart(id) {
    setLoading(true);
    API.addToCart(localStorage.getItem('auth'), id, 4)
      .then(res => {
        setLoading(false);
        console.log(res)
      })
  }

  const itemList = items.map(i => (
    <li key={i.id}>

      <p>
        {i.name} - {i.price}
        <button
          onClick={(e) => {
            handleAddToCart(i.id)
          }}>
          {loading ? <Spinner /> : 'Show Review'}
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