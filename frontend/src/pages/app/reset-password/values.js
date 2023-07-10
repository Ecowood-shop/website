// yup
import * as Yup from "yup";

export const initialValues = {
  password: "",
  confirmPassword: "",
};

export const validationSchema = Yup.object({
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "password must contain at least eight characters, at least one number and both lower and uppercase letters"
    )
    .required("required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "passwords don't  match")
    .required("please confirm your password"),
});
