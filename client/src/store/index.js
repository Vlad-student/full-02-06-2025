import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categoriesSlice";
import authReducer from "./authSlice";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import ordersReducer from "./ordersSlice";

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});

export default store;
