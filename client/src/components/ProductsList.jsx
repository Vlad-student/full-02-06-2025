import React from "react";
import ProductsItem from "./ProductsItem";

const ProductsList = (props) => {
  const { products } = props;
  const showProduct = (product) => (
    <ProductsItem key={product._id} product={product} />
  );
  return <section>{products.map(showProduct)}</section>;
};

export default ProductsList;
