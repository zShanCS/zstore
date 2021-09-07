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
            <li key={i.id}>{i.name} - {i.price}</li>
          ))
        }
      </ul>

    </div>
  )
}
export default Products