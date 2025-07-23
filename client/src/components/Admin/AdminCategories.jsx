import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesThunk } from "../../store/categoriesSlice";

const AdminCategories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  return <div></div>;
};

export default AdminCategories;
