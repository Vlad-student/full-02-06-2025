import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../store/productsSlice";
import ProductsList from "../components/ProductsList";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, error, isLoading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);
  return (
    <div>
      <h1>HomePage</h1>
      <ProductsList products={products}/>
    </div>
  );
};

export default HomePage;
