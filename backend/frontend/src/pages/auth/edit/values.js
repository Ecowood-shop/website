// yup
import * as Yup from "yup";

export const initialValues = (user) => {
  return {
    firstName: user.first_name ? user.first_name : "",
    lastName: user.last_name ? user.last_name : "",
    phone: user.phone ? user.phone : "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  };
};

export const validationSchema = (t, isFirstPage) => {
  return Yup.object({
    firstName: Yup.string().when("updatePassword", (password, schema) =>
      isFirstPage
        ? schema
            .matches(
              /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
              t("validation.name must contain only letters and numbers")
            )
            .required(t("validation.required"))
        : schema
    ),
    lastName: Yup.string().when("updatePassword", (password, schema) =>
      isFirstPage
        ? schema
            .matches(
              /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
              t("validation.name must contain only letters and numbers")
            )
            .required(t("validation.required"))
        : schema
    ),
    phone: Yup.string().when("updatePassword", (password, schema) =>
      isFirstPage ? schema.required(t("validation.required")) : schema
    ),
    password: Yup.string().required(t("validation.required")),
    newPassword: Yup.string().when("updatePassword", (password, schema) =>
      !isFirstPage
        ? schema
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              t(
                "validation.password must contain at least eight characters, at least one number and both lower and uppercase letters"
              )
            )
            .required(t("validation.required"))
        : schema
    ),
    confirmPassword: Yup.string().when("updatePassword", (password, schema) =>
      !isFirstPage
        ? schema
            .oneOf(
              [Yup.ref("newPassword")],
              t("validation.passwords don't  match")
            )
            .required(t("validation.required"))
        : schema
    ),
  });
};
