import React from "react";
import CONSTANTS from "../../../constants";
import styles from "../stylesComponents/Products.module.scss";
import { mdiFlagTriangle } from "@mdi/js";
import Icon from "@mdi/react";

const ProductsItem = (props) => {
  const {
    product: { title, price, stockQty, isSale, images, category },
  } = props;
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
    </article>
  );
};

export default ProductsItem;
