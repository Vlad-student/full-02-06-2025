import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../../store/productsSlice";
import AdminProductRow from "./AdminProductRow";
import AdminProductsForm from "./AdminProductsForm";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.products);
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProductsThunk());
    }
  }, [dispatch, products.length]);

  const showProducts = (product) => (
    <AdminProductRow key={product._id} product={product} />
  );
  return (
    <section>
      <h2>Products</h2>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <td>title</td>
            <td>description</td>
            <td>price</td>
            <td>stockQTY</td>
            <td>category</td>
            <td>isSale</td>
            <td>images</td>

            <th>update</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>{products?.map(showProducts)}</tbody>
      </table>
      <AdminProductsForm />
    </section>
  );
};

export default AdminProducts;
