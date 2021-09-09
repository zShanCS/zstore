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
        const items = await API.fetchItems();
        if (isSubscribed) setItems(items);
      }
    )()
    return () => { isSubscribed = false; console.log('produs subscription cancelled') }
  }, [])

  const itemList = items.map(i => (
    <li key={i.id}>

      <p>
        {i.name} - {i.price}
        <button onClick={(e) => {
          setLoading(true);
          API.getReviews(i.id, '2')
            .then(res => {
              setLoading(false);
              console.log(res)
            })
        }}>{loading ? <Spinner /> : 'Show Review'}</button>
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