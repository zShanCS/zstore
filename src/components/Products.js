import React, { useEffect, useState } from "react";
import API from "../API";
const Products = () => {

  const [items, setItems] = useState([]);
  useEffect(() => {
    API.fetchItems().then(items => setItems(items))
  }, [])

  return (
    <div>
      <h2>Products</h2>
      {JSON.stringify(items)}
      <ul>
        {
          items.map(i => (
            <li key={i.id}>

              <p>
                {i.name} - {i.price}
                <button onClick={() => {
                  API.getReviews(i.id, '2')
                    .then(res => console.log(res))
                }}>View Reviews</button>
              </p>

            </li>
          ))
        }
      </ul>

    </div>
  )
}
export default Products