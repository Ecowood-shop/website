// Import yup
import * as Yup from "yup";
// Import actions
import { updateCart } from "../../../toolkit/cart/actions";

// Export initial values
export const initialValues = (quantity) => {
  return {
    quantity: quantity ? Number(quantity) : 0,
  };
};

// Export validation schema
export const validationSchema = (t, variant) =>
  Yup.object({
    quantity: Yup.number()
      .test("variant not active", `${t("cart.product is deleted")}`, () => {
        return !!variant.active;
      })
      .min(1, `${t("cart.in stock")} ${variant.quantity}`)
      .max(variant.quantity, `${t("cart.in stock")} ${variant.quantity}`)
      .required(t("product.select quantity")),
  });

// Export form submit function
export const onSubmit = (values, dispatch, id) => {
  dispatch(updateCart({ id: id, qty: values.quantity }));
};
