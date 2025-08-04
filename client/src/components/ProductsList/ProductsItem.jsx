import React from "react";
import CONSTANTS from "../../../constants";
import styles from "../stylesComponents/Products.module.scss";
import { mdiFlagTriangle, mdiCart } from "@mdi/js";
import Icon from "@mdi/react";
import { addToCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";

const ProductsItem = (props) => {
  const dispatch = useDispatch();
  const { product } = props;
  const { title, price, stockQty, isSale, images, category } = product;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <article className={styles["product"]}>
      {isSale && <Icon className={styles["icon"]} path={mdiFlagTriangle} />}
      <div className={styles["pic"]}>
        <img
          src={`${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${images[0]}`}
          alt={title}
        />
      </div>
      <h3>{title}</h3>
      <p>{price}</p>
      <p>{category?.name}</p>
      <p>{stockQty > 0 ? "Available" : "Not available"}</p>
      <Icon path={mdiCart} size={1} onClick={handleAddToCart} />
    </article>
  );
};

export default ProductsItem;
