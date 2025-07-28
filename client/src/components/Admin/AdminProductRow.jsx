import React from "react";
import CONSTANTS from "../../../constants";
import { useDispatch } from "react-redux";
import { deleteProductThunk } from "../../store/productsSlice";

const AdminProductRow = (props) => {
  const dispatch = useDispatch();
  const {
    product: {
      _id,
      title,
      description,
      price,
      stockQTY,
      category,
      isSale,
      images,
    },
  } = props;

  const showImages = (img, i) => (
    <img
      key={i}
      src={`${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${img}`}
      alt={title}
    />
  );
  const hadnleDelete = (id) => {
    dispatch(deleteProductThunk(id));
  };
  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td>{price}</td>
      <td>{stockQTY}</td>
      <td>{category?.name}</td>
      <td>{isSale ? "sale" : "no sale"}</td>
      <td>{images.map(showImages)}</td>
      <td>
        <button>update</button>
      </td>
      <td>
        <button onClick={() => hadnleDelete(_id)}>delete</button>
      </td>
    </tr>
  );
};

export default AdminProductRow;
