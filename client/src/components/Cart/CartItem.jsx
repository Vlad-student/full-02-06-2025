import React from "react";
import styles from "./Cart.module.scss";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../store/cartSlice";

const CartIten = (props) => {
  const dispatch = useDispatch();
  const { item } = props;

  const handleDelete = () => {
    dispatch(removeFromCart(item._id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(item._id));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(item._id));
  };

  return (
    <li className={styles["cart-item"]}>
      <h3>{item.title}</h3>
      <p>{item.price} uah</p>
      <div>
        <button onClick={handleDecrement}>-</button>
        <span>{item.quantity}</span>
        <button onClick={handleIncrement}>+</button>
      </div>

      <button onClick={handleDelete}> delete from cart</button>
    </li>
  );
};

export default CartIten;
