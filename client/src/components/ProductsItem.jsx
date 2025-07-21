import React from "react";
import CONSTANTS from "../../constants";

const ProductsItem = (props) => {
  const {
    product: { title, price, stockQty, isSale, images, category },
  } = props;
  return (
    <article>
      {isSale && <p>sale</p>}
      <div>
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
