import * as yup from "yup";
import CONSTANTS from "../../constants";

export const orderDeliverySchema = yup.object({
  customerPhone: yup.string().trim().matches().required(),
  shippingAdress: yup.string().oneOf(CONSTANTS.SHIPPING_METHOD),
  shippingMethod: yup.string().trim(),
});
