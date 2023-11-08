import Vue from "vue";
import Vuex from "vuex";

import pagination from "./modules/pagination";
import item from "./modules/item";
import itemcategory from "./modules/itemcategory";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    pagination,
    item,
    itemcategory
  }
});
