import React from "react";
import ProductsItem from "./ProductsItem";
import styles from "../stylesComponents/Products.module.scss";

const ProductsList = (props) => {
  const { products } = props;
  const showProduct = (product) => (
    <ProductsItem key={product._id} product={product} />
  );
  return (
    <section className={styles["products"]}>
      {products.map(showProduct)}
    </section>
  );
};

export default ProductsList;
