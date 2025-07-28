import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useDispatch } from "react-redux";
import {
  createCategoryThunk,
  updateCategoryThunk,
} from "../../store/categoriesSlice";

const AdminCategoriesForm = (props) => {
  const { cancelFrom, selectedCategory } = props;
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    if (selectedCategory) {
      dispatch(updateCategoryThunk({ id: selectedCategory._id, values }));
    } else {
      dispatch(createCategoryThunk(values));
    }
    cancelFrom();
  };
  return (
    <Formik
      initialValues={{ name: selectedCategory?.name || "" }}
      onSubmit={onSubmit}
    >
      {() => {
        return (
          <Form>
            <label>
              <span>Category name:</span>
              <Field type="text" name="name" />
              <ErrorMessage name="name" />
            </label>
            <button type="submit">
              {selectedCategory ? "Update" : "Create"}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AdminCategoriesForm;
