import { Categories } from "./assets/Categories";
import { Items } from "./assets/Items";
import { Reviews } from "./assets/Reviews";
import { Users } from "./assets/Users";

const API = {

  //item apis
  fetchItems: async () => {
    return [...Items];
  },
  searchItem: async (searchTerm) => {
    return Items.filter(item => item.name.match(searchTerm))
  },
  fetchCategory: async (category) => {
    return Items.filter(item => item.category === category)
  },
  addDetailView: async (itemId, userId) => {
    Items.filter(item => item.id === itemId)[0].detailViews.add(userId);
  },


  //reviews
  getReviews: async (itemId, userId) => {
    const reviews = Reviews.filter(review => review.itemId === itemId);
    return reviews.map(review => ({
      ...review,
      upvotes: review.upvotes.size,
      downvotes: review.downvotes.size,
      upvoted: review.upvotes.has(userId),
      downvoted: review.downvotes.has(userId),
      username: Users.filter(u => u.id === review.userId)[0].name
    }))
  },


  //user apis
  registerUser: async (uname, pword) => {
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
        secret,
        status: 'success',
        name: newUser.name,
        isSeller: newUser.isSeller,
        username: newUser.username,
        favoriteCategories: newUser.favoriteCategories,
        cart: newUser.cart
      }
    }
    return { status: 'failed', issue: 'username exists' };
  },
  getCart: async (userId) => {
    return Users.filter(user => user.id === userId)[0].cart;
  },
  userLogin: async (uname, pword) => {
    const user = Users.find(user => user.username === uname);
    if (user && user.password === pword) {
      let secret = await generateSecret(user.id)
      Users.find(u => u.id === user.id).secret = secret;
      return {
        secret,
        status: 'success',
        name: user.name,
        isSeller: user.isSeller,
        username: user.username,
        favoriteCategories: user.favoriteCategories,
        cart: user.cart
      }
    }
    return {
      status: 'failed',
      issue: 'username or password wrong'
    }
  },

  //categories
  getCategories: async () => {
    return Categories;
  },

  //everything
  printAll: () => {
    console.log({
      Users, Items, Reviews, Categories
    })
  }

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
  return `${id}-${Math.random()}`
}

export default API;