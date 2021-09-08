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
    if (pword.length < 8) return { status: 'error', issue: 'Password must be more than 8 characters' }
    if (await checkUname(uname)) {
      const id = await generateUniqueUserId();
      const newUser = {
        id,
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
      return { status: 'success' }
    }
    return false;
  },
  getCart: async (userId) => {
    return Users.filter(user => user.id === userId)[0].cart;
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

async function checkUname(uname) {
  if (!Users.find(x => x.username === uname)) return true;
  return false;
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

export default API;