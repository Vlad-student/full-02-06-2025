import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersForAdminThunk } from "../../store/ordersSlice";
import styles from "../stylesComponents/Admin.module.scss";
import AdminOrderRow from "./AdminOrderRow";

const AdminOrder = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    if (orders?.length === 0) {
      dispatch(getOrdersForAdminThunk());
    }
  }, [dispatch, orders?.length]);

  const showOrderRow = (order) => (
    <AdminOrderRow key={order._id} order={order} />
  );
  return (
    <section className={styles["orders-table"]}>
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th rowSpan="2">User Email</th>
            <th colSpan="4">Shipping</th>
            <th rowSpan="2">Price</th>
            <th rowSpan="2">Status</th>
            <th rowSpan="2">Update</th>
            <th rowSpan="2">Total</th>
          </tr>
          <tr>
            <th>Phone</th>
            <th>Address</th>
            <th>Method</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>{orders.map(showOrderRow)}</tbody>
      </table>
    </section>
  );
};

export default AdminOrder;
