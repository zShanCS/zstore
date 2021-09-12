// import { Categories } from "./assets/Categories";
// import { Items } from "./assets/Items";
// import { Reviews } from "./assets/Reviews";
const BASE_LINK = 'http://localhost:5000/';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}
//item apis
const getItems = async () => {
  try {
    return { status: 'success', items: await (await fetch(`${BASE_LINK}items/`)).json() };
  } catch (error) {
    return { status: 'failed' }
  }
}
const getItem = async (itemId) => {
  try {
    const res = await (await fetch(`${BASE_LINK}items/${itemId}`)).json();
    if (res.hasOwnProperty('id')) {
      return { status: 'success', item: res }
    }
    else {
      return { status: 'failed', message: 'no such item' }
    }
  } catch (error) {
    return { status: 'failed', message: 'something went wrong' }
  }
}
async function updateItem(data, id) {
  try {
    const res = await (await fetch(`${BASE_LINK}items/${id}`, { headers, method: "PATCH", body: JSON.stringify(data) })).json()
    if (res.hasOwnProperty('id')) {
      return { status: 'success', item: res }
    }
    else {
      return { status: 'failed', message: 'something went wrong' }
    }
  }
  catch (e) {
    return { status: 'failed', message: e.message }
  }
}
const searchItem = async (searchTerm) => {

}
const fetchCategory = async (category) => {
  try {
    const items = await (await fetch(`${BASE_LINK}items?category=${category}`)).json()
    return { status: 'success', items }
  } catch (error) {
    return { status: 'failed' }
  }
}

const addDetailView = async (itemId, secret) => {

}


//reviews
const getReviews = async (itemId) => {
  try {
    const reviews = await (await fetch(`${BASE_LINK}reviews?itemId=${itemId}`)).json()
    return {
      status: 'success',
      reviews
    }
  } catch (error) {
    return {
      status: 'failed'
    }
  }
}
//cart apis
const addToCart = async (secret, itemId, quantity) => {
  try {
    if (isNaN(parseInt(quantity))) {
      //qaulity is NaN
      return { status: 'failed', message: 'quality incorrect. can only be positive integer' }
    }
    quantity = parseInt(quantity);
    if (quantity < 1 || quantity > 10) {
      //quality less than 1
      return { status: 'failed', message: 'quality incorrect. can only be positive integer less than 11' }
    }
    const resItem = await getItem(itemId);
    if (resItem.status === 'success') {
      //item found
      const item = resItem.item;
      if (item.quantity >= quantity) {
        //quantity allowed
        const userRes = await getUserBySecret(secret);
        if (userRes.status === 'success') {
          //user found
          const user = userRes.user;
          const cart = user.cart;
          if (cart.cartItems.hasOwnProperty(itemId)) {
            //item is already in cart
            //so update quantity
            console.log('b4 update', cart.cartItems[itemId])
            cart.cartItems[itemId] += quantity;
            console.log('after update', cart.cartItems[itemId])
            cart.lastUpdated = new Date()
          }
          else {
            cart.cartItems[itemId] = quantity;
            cart.lastUpdated = new Date()
          }
          //now new cart completed so we update users cart
          const updateUserRes = await updateUser({ cart }, user.id)
          if (updateUserRes.status === 'success') {
            //user cart updated successfully
            //and decrease item quantity from database
            //we dont wait for response just hope for it to work out
            updateItem({ quantity: item.quantity - quantity }, itemId);
            return { status: 'success', newCart: updateUserRes.user.cart }
          }
          else {
            //cart update failed
            return { status: 'failed', message: 'something went wrong while updating cart' }
          }
        }
        else {
          //if user not found
          return { status: 'failed', message: 'user not found' }
        }
      }
      else {
        //if quanitity not allowed
        return { status: 'failed', message: 'quality not allowed' }
      }
    }
    else {
      //if item not found
      return { status: 'failed', message: 'item not found' }
    }
  } catch (error) {
    return { status: 'failed', message: `something went wrong ${error.message}` }
  }
}

//user apis
const registerUser = async (uname, pword) => {
  if (uname.length < 2 || pword.length < 5) {
    return { status: 'failed', message: 'username or password too small' }
  }
  if (uname.match('~')) {
    return { status: 'failed', message: 'username cant have ~' }
  }
  if (await usernameValid(uname)) {
    const newUser = {
      username: uname,
      password: pword,
      secret: generateSecret(uname),
      name: uname,
      isSeller: false,
      favoriteCategories: [],
      cart: {
        lastUpdated: new Date(),
        cartItems: []
      }
    }
    const res = await postUser(newUser);
    if (res.hasOwnProperty('id')) {
      return {
        status: 'success',
        secret: res.secret
      }
    }
    else {
      return { status: 'failed' }
    }
  }
  else {
    return {
      status: 'failed',
      message: 'Username Not Available'
    }
  }
}
const getCart = async (secret) => {
  const res = await getUserBySecret(secret)
  if (res.status === 'success') {
    return {
      status: 'success',
      cart: res.user.cart
    }
  }
  else return res;
}
const userLogin = async (uname, pword) => {
  const res = await getUserByUserName(uname);
  if (res.status === 'success') {
    const user = res.user;
    if (user.password === pword) {
      const secret = generateSecret(uname);
      const updateRes = await updateUser({ secret }, user.id);
      if (updateRes.status === 'success') {
        return { status: 'success', secret: updateRes.user.secret }
      }
      else {
        return { ...updateRes }
      }
    }
    else {
      return { status: 'falied', message: 'username or password wrong' }
    }
  }
  else {
    return { status: 'falied', message: 'username or password wrong' }
  }
}

const getUserBySecret = async (secret) => {
  const res = await (await fetch(`${BASE_LINK}users?secret=${secret}`)).json()
  if (res.length < 1) {
    return { status: 'failed', message: 'no user found' }
  }
  else {
    return {
      status: 'success',
      user: res[0]
    }
  }
}


//categories
const getCategories = async () => {
}

//everything
const printAll = async () => {
}
async function usernameValid(username) {
  const res = await getUserByUserName(username)
  if (res.status === 'failed' && res.message === 'not found') return true
  return false;
}

async function getUserByUserName(username) {
  try {
    const res = await (await fetch(`${BASE_LINK}users?username=${username}`)).json()
    if (res && res.length === 1) {
      return {
        status: 'success',
        user: res[0]
      }
    }
    else {
      return {
        status: 'failed',
        message: 'not found'
      }
    }
  } catch (error) {
    return {
      status: 'failed',
      message: 'error'
    }
  }

}

function generateSecret(uname) {
  return `${uname}~${Math.random()}`
}
async function getUserById(id) {
  const res = await (await fetch(`${BASE_LINK}users/${id}`)).json()
  return res;
}
async function postUser(data) {
  const res = (await fetch(`${BASE_LINK}users`, { headers, method: "POST", body: JSON.stringify(data) })).json()
  return res
}
async function updateUser(data, id) {
  try {
    const res = await (await fetch(`${BASE_LINK}users/${id}`, { headers, method: "PATCH", body: JSON.stringify(data) })).json()
    if (res.hasOwnProperty('id')) {
      return { status: 'success', user: res }
    }
    else {
      return { status: 'failed', message: 'something went wrong' }
    }
  }
  catch (e) {
    return { status: 'failed', message: e.message }
  }
}

const API = {
  fetchItems: getItems,
  fetchCategory,
  searchItem,
  addDetailView,
  getCart,
  getReviews,
  getCategories,
  registerUser,
  userLogin,
  authenticateUser: getUserBySecret,
  addToCart,
  printAll
}
export default API;