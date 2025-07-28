import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesThunk } from "../store/categoriesSlice";
import { Link, NavLink } from "react-router-dom";
import styles from "./stylesComponents/Header.module.scss";
import { logOutThunk } from "../store/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
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
  const logout = () => dispatch(logOutThunk());
  return (
    <header>
      <div className={styles["register-form"]}>
        {user ? (
          <>
            <div className={styles["panel"]}>
              <span>Hi, {user?.login}</span>
              {user?.role === "admin" && (
                <Link to="/admin-panel">Admin Panel</Link>
              )}
              <button onClick={logout}>Logout</button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Sign in</Link> / {""}
            <Link to="/register">Sign up</Link>
          </>
        )}
      </div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src="/Logo.svg" alt="Ecobazar Logo" />
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
          {categories?.map(showCategory)}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
