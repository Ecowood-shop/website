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
    updatePassword: [],
  };
};
export const validationSchema = Yup.object({
  firstName: Yup.string().when("updatePassword", (updatePassword, schema) =>
    updatePassword[0] && updatePassword[0][0] === "true"
      ? schema
          .matches(
            /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
            "name must contain only letters and numbers"
          )
          .required("Required")
      : schema
  ),
  lastName: Yup.string().when("updatePassword", (updatePassword, schema) =>
    updatePassword[0] && updatePassword[0][0] === "true"
      ? schema
          .matches(
            /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
            "last name must contain only letters and numbers"
          )
          .required("Required")
      : schema
  ),
  phone: Yup.string().when("updatePassword", (updatePassword, schema) =>
    updatePassword[0] && updatePassword[0][0] === "true"
      ? schema.required("Required")
      : schema
  ),
  password: Yup.string().required("Required"),

  newPassword: Yup.string().when("updatePassword", (updatePassword, schema) =>
    updatePassword[0] && updatePassword[0][0] === "true"
      ? schema
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            "password must contain at least eight characters, at least one number and both lower and uppercase letters"
          )
          .required("Required")
      : schema
  ),
  confirmPassword: Yup.string().when(
    "updatePassword",
    (updatePassword, schema) =>
      updatePassword[0] && updatePassword[0][0] === "true"
        ? schema
            .oneOf([Yup.ref("newPassword")], "Passwords don't  match")
            .required("Please confirm your password")
        : schema
  ),
});
