import React from "react";
import AdminOrderForm from "./AdminOrderForm";

const AdminOrderRow = (props) => {
  const { order } = props;
  const {
    user,
    products,
    customerPhome,
    shippingAdress,
    shippingMethod,
    totalSum,
    status,
  } = order;

  const showProduct = (product) => (
    <tr key={product?.productId?._id}>
      <td>{product?.productId?.title}</td>
      <td>{product?.productPrice}</td>
      <td>{product?.quantity}</td>
    </tr>
  );

  return (
    <tr>
      <td>{user.email}</td>
      <td>{customerPhome}</td>
      <td>{shippingAdress}</td>
      <td>{shippingMethod}</td>

      <td>
        <table>
          <tbody>{products.map(showProduct)}</tbody>
        </table>
      </td>
      <td>{totalSum}</td>

      <td>{status}</td>
      <td>
        <AdminOrderForm order={order} />
      </td>
    </tr>
  );
};

export default AdminOrderRow;
