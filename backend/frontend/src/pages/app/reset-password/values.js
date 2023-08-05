// yup
import * as Yup from "yup";

export const initialValues = {
  password: "",
  confirm_password: "",
};

export const validationSchema = Yup.object({
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "password must contain at least eight characters, at least one number and both lower and uppercase letters"
    )
    .required("required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "passwords don't  match")
    .required("please confirm your password"),
});
