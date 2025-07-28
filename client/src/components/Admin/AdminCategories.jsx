import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryThunk,
  getAllCategoriesThunk,
} from "../../store/categoriesSlice";
import styles from "../stylesComponents/Admin.module.scss";
import AdminCategoriesForm from "./AdminCategoriesForm";

const CategoryRow = (props) => {
  const dispatch = useDispatch();
  const { category, handleUpdate } = props;
  const handleDelete = (id) => {
    dispatch(deleteCategoryThunk(id));
  };
  return (
    <tr className={styles["category"]}>
      <td>{category.name}</td>
      <td>
        <button onClick={() => handleUpdate(category)}>update</button>
      </td>
      <td>
        <button onClick={() => handleDelete(category._id)}>delete</button>
      </td>
    </tr>
  );
};

const AdminCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    if (categories?.length === 0) {
      dispatch(getAllCategoriesThunk());
    }
  }, [dispatch, categories?.length]);

  const handleCreate = () => {
    setIsCreating(true);
    setSelectedCategory(null);
  };
  const cancelFrom = () => {
    setIsCreating(false);
  };
  const handleUpdate = (category) => {
    setIsCreating(true);
    setSelectedCategory(category);
  };
  const showCategory = (category) => (
    <CategoryRow
      key={category._id}
      category={category}
      handleUpdate={handleUpdate}
    />
  );
  return (
    <section className={styles["admin-table"]}>
      <h3>Admin categories</h3>
      <button onClick={handleCreate} className={styles["create"]}>
        Creare new category
      </button>
      {isCreating && (
        <AdminCategoriesForm
          cancelFrom={cancelFrom}
          selectedCategory={selectedCategory}
        />
      )}
      <table>
        <tbody>{categories.map(showCategory)}</tbody>
      </table>
    </section>
  );
};

export default AdminCategories;
