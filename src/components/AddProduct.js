import React, { useState } from "react";
import API from "../API";

const AddProduct = () => {
  const [prodName, setProdName] = useState('')
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [category, setCategory] = useState('')

  const [nameErr, setNameErr] = useState('')
  const [priceErr, setPriceErr] = useState('')
  const [quantityErr, setQuantityErr] = useState('')
  const [categoryErr, setCategoryErr] = useState('')

  function handleSubmit(e) {
    var allow = true;
    e.preventDefault()
    //check and errors
    if (prodName.length < 4) {
      setNameErr('Name Length Too Short');
      allow = false;
    }
    if (prodName.length > 151) {
      setNameErr('Name Length Too Long')
      allow = false
    }
    if (Number(price) <= 0) {
      setPriceErr('Price Cant be less than or zero')
      allow = false
    }
    if (category === '') {
      setCategoryErr('Please Enter A category')
      allow = false
    }
    if (parseInt(quantity) < 1) {
      setQuantityErr('Quanityt too small')
      allow = false
    }
    //if no errors found
    if (allow) {

      alert('submitted')
      API.createItem(prodName, price, quantity, category, localStorage.getItem('auth'))
        .then(
          res => {
            if (res.status === 'success') {
              console.log(res)
              alert('item created successfully')
            }
            else {
              alert(`item created failed. Error: ${res.message}`)
            }
          }
        )

    }
    else {
      //if there were errors
      alert('something not right')
      console.log(nameErr, priceErr, categoryErr, quantityErr)
    }

  }
  return (
    <div>
      <form onSubmit={(e) => { handleSubmit(e) }}>
        <div>
          <label>
            Name
            <input
              type="text"
              name="prod_name"
              value={prodName}
              onChange={(e) => { setProdName(e.currentTarget.value) }}
            />
          </label>
        </div>
        <div>
          <label>
            Price (in dollars)
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => { setPrice(e.currentTarget.value) }}
            />
          </label>
        </div>
        <div>
          <label>
            Available Quantity
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => { setQuantity(e.currentTarget.value) }}
            />
          </label>
        </div>
        <div>
          <label>
            Category the item falls in
            <input
              type="text"
              name="category"
              value={category}
              onChange={(e) => { setCategory(e.currentTarget.value) }}
            />
          </label>
        </div>
        <div>
          <button type="submit">Post</button>
        </div>
      </form>
    </div>
  )
}
export default AddProduct