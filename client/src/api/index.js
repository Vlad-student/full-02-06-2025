import axious from "axios";
import CONSTANTS from "../../constants";

const apiClient = axious.create({
  baseURL: CONSTANTS.BASE_URL,
});

// categories
export const getAllCategories = () => apiClient.get("/categories");
