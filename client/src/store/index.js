import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './categoriesSlice';

const store = configureStore({
  reducer: {
    categories: categoryReducer
  },
});
export default store;