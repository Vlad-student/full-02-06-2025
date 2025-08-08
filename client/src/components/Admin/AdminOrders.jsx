import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersForAdminThunk } from "../../store/ordersSlice";
import styles from "../stylesComponents/Admin.module.scss";

const AdminOrder = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    if (orders?.length === 0) {
      dispatch(getOrdersForAdminThunk());
    }
  }, [dispatch, orders?.length]);

  return (
    <section className={styles["orders-table"]}>
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th rowSpan="2">User Email</th>
            <th colSpan="4">Shipping</th>
            <th rowSpan="2">Products</th>
            <th rowSpan="2">Total</th>
            <th rowSpan="2">Status</th>
            <th rowSpan="2">Update</th>
          </tr>
          <tr>
            <th>Phone</th>
            <th>Method</th>
            <th>Address</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </section>
  );
};

export default AdminOrder;
