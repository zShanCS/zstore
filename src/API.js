import { Categories } from "./assets/Categories";
import { Items } from "./assets/Items";
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


  //user apis
  getCart: (userId) => {
    return Users.filter(user => user.id === userId)[0].cart;
  },

  //categories
  getCategories: () => {
    return Categories;
  }

}
export default API;