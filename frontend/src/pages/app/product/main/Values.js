// yup
import * as Yup from "yup";

export const initialValues = (variants) => {
  return {
    color:
      variants.length > 0 && variants[0].color.toLowerCase() == "default"
        ? variants[0]
        : variants.length == 0
        ? { quantity: 0 }
        : null,
    quantity: "",
  };
};

export const validationSchema = (t) =>
  Yup.object({
    color: Yup.object().required("Required"),
    quantity: Yup.number()
      .positive("selected quantity must be non negative")
      .min(1, "select quantity must be more than 0")
      .when("color", (color, schema) => {
        return schema
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
