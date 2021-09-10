import { Categories } from "./assets/Categories";
import { Items } from "./assets/Items";
import { Reviews } from "./assets/Reviews";
import { Users } from "./assets/Users";
const myDelay = 3000;

//item apis
const fetchItems = async () => {
  await fakeDelay(myDelay)
  return [...Items];
}
const searchItem = async (searchTerm) => {
  await fakeDelay(myDelay)
  return Items.filter(item => item.name.match(searchTerm))
}
const fetchCategory = async (category) => {
  await fakeDelay(myDelay)
  return Items.filter(item => item.category === category)
}
const addDetailView = async (itemId, secret) => {
  await fakeDelay(myDelay)
  const result = await authenticateUser(secret)
  if (result.status === 'authenticated') {
    Items.filter(item => item.id === itemId)[0].detailViews.add(result.userData.id);
    return {
      status: 'success'
    }
  }
  return {
    status: 'failed',
    issue: 'Cant Authenticate user'
  };

}


//reviews
const getReviews = async (itemId) => {
  await fakeDelay(myDelay)
  const reviews = Reviews.filter(review => review.itemId === itemId);
  return reviews.map(review => ({
    ...review,
    upvotes: review.upvotes.size,
    username: Users.find(u => u.id === review.userId).name
  }))
}


//user apis
const registerUser = async (uname, pword) => {
  await fakeDelay(myDelay)
  if (pword.length < 8)
    return {
      status: 'failed', issue: 'Password must be more than 8 characters'
    }
  if (!(await usernameExists(uname))) {
    console.log('username is unique af')
    const id = await generateUniqueUserId();
    const secret = await generateSecret(id);
    const newUser = {
      id,
      secret,
      uname,
      name: uname,
      password: pword,
      isSeller: false,
      favoriteCategories: [],
      cart: {
        lastUpdated: new Date(),
        cartItems: []
      }
    };
    Users.push(newUser);
    return {

      status: 'authenticated',
      user: {
        secret,
        id: newUser.id,
        name: newUser.name,
        isSeller: newUser.isSeller,
        username: newUser.username,
        favoriteCategories: newUser.favoriteCategories,
        cart: newUser.cart
      }

    }
  }
  return { status: 'failed', issue: 'username exists' };
}
const getCart = async (secret) => {
  await fakeDelay(myDelay)
  const userResult = await authenticateUser(secret)
  if (userResult.status === 'authenticated') {
    return userResult.user.cart;
  }
  return {
    status: 'failed',
    issue: 'cant authenticate'
  }
}
const userLogin = async (uname, pword) => {
  await fakeDelay(myDelay)
  const user = Users.find(user => user.username === uname);
  if (user && user.password === pword) {
    let secret = await generateSecret(user.id)
    Users.find(u => u.id === user.id).secret = secret;
    return {

      status: 'authenticated',
      user: {
        secret,
        id: user.id,
        name: user.name,
        isSeller: user.isSeller,
        username: user.username,
        favoriteCategories: user.favoriteCategories,
        cart: user.cart
      },
    }
  }
  return {
    status: 'failed',
    issue: 'username or password wrong'
  }
}
const authenticateUser = async (secret) => {
  await fakeDelay(myDelay)
  if (!secret) {
    return {
      status: 'failed',
      issue: 'cant authenticate user - no secret'
    }
  }

  if (secret.split('~').length < 1) {
    return {
      status: 'failed',
      issue: 'cant authenticate user - pattern mismatch'
    }
  }

  const user = Users.find(u => u.secret === secret)

  if (user) {
    return {
      status: 'authenticated',
      user: {
        secret,
        id: user.id,
        name: user.name,
        isSeller: user.isSeller,
        username: user.username,
        favoriteCategories: user.favoriteCategories,
        cart: user.cart
      },
    }
  }
  else {
    return {
      status: 'failed',
      issue: 'cant authenticate user'
    }
  }

}


//categories
const getCategories = async () => {
  await fakeDelay(myDelay)
  return Categories;
}

//everything
const printAll = () => {
  console.log({
    Users, Items, Reviews, Categories
  })
}
async function usernameExists(uname) {
  return (!(!Users.find(u => u.username === uname)))
}
async function generateUniqueUserId() {
  let nid = Math.random().toString();
  while (idExists(nid)) {
    nid = Math.random().toString();
  }
  return nid;
}
function idExists(id) {
  return !(!Users.find(x => x.id === id));
}
async function generateSecret(id) {
  return `${id}~${Math.random()}`
}

function fakeDelay(time) {
  return new Promise(resolve => {
    setTimeout(() => { resolve(); }, time)
  })
}
const API = {
  fetchItems,
  fetchCategory,
  searchItem,
  addDetailView,
  getCart,
  getReviews,
  getCategories,
  registerUser,
  userLogin,
  authenticateUser,
  printAll
}
export default API;