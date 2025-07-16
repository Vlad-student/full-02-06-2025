import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesThunk } from "../store/categoriesSlice";
import { NavLink } from "react-router-dom";
import styles from "./stylesComponents/Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const { categories, error, isLoading } = useSelector(
    (state) => state.categories
  );
  useEffect(() => {
    if (categories?.length === 0) {
      dispatch(getAllCategoriesThunk());
    }
  }, [dispatch, categories?.length]);
  const showCategory = (category) => (
    <li key={category._id}>
      <NavLink to={`/categories/${category._id}`}>{category.name}</NavLink>
    </li>
  );
  return (
    <header>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src="../assets/Logo.svg" alt="Ecobazar Logo" />
        </div>
        <div className={styles["search-bar"]}>
          <input type="text" placeholder="Search" />
          <button>Search</button>
        </div>
      </div>
      <nav>
        <ul className={styles["main-menu"]}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {isLoading && <p>Loading</p>}
          {error && <p>{error}</p>}
          {categories?.map(showCategory)}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
