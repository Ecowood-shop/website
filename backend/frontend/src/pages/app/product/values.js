// Import yup
import * as Yup from "yup";

// Import actions
import { addToCart } from "../../../toolkit/cart/actions";

// Export initial values
export const initialValues = (variants) => {
  return {
    color:
      variants.length > 0 && variants[0].color.toLowerCase() === "default"
        ? variants[0]
        : variants.length === 0
        ? { quantity: 0 }
        : null,
    quantity: "",
  };
};

// export validation schema
export const validationSchema = (t, user) =>
  Yup.object({
    color: Yup.object().required(t("global.required")),
    quantity: Yup.number()
      .positive("selected quantity must be non negative")
      .min(1, t("product.selected quantity must be greater than 0"))
      .when("color", (color, schema) => {
        return schema
          .test({
            test: () => !!user,
            message: t("product.authorization is required"),
          })
          .test({
            test: () => color && color[0],
            message: t("product.choose a color"),
          })
          .test({
            test: (quantity) =>
              (!color && !color[0]) ||
              (color &&
                color[0] &&
                Number(quantity) <= Number(color[0].quantity)),
            message: `${t("product.in stock")} ${
              color && color[0] ? color[0].quantity : color
            }`,
          });
      })
      .required(t("product.select quantity")),
  });

// Export form submit function
export const onSubmit = (values, actions, dispatch, product) => {
  setTimeout(() => {
    dispatch(
      addToCart({
        id: product._id,
        formData: { variantID: values.color.id, qty: values.quantity },
      })
    );
    actions.setSubmitting(false);
  }, 1000);
};
