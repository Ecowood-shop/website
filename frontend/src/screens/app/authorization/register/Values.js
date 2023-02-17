// yup
import * as Yup from "yup";

export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .matches(
      /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
      "name must contain only letters and numbers"
    )
    .required("Required"),
  lastName: Yup.string()
    .matches(
      /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
      "last name must contain only letters and numbers"
    )
    .required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  phone: Yup.string().required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "password must contain at least eight characters, at least one number and both lower and uppercase letters"
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords don't  match")
    .required("Please confirm your password"),
});
