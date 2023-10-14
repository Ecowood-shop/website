// yup
import * as Yup from "yup";

// Import register function
import { register } from "../../../../../toolkit/auth/registerSlice";

export const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export const validationSchema = (t) => {
  return Yup.object({
    first_name: Yup.string()
      .matches(
        /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
        t("validation.name must contain only letters and numbers")
      )
      .required(t("validation.required")),
    last_name: Yup.string()
      .matches(
        /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
        t("validation.last name must contain only letters and numbers")
      )
      .required(t("validation.required")),
    email: Yup.string()
      .email(t("validation.invalid email format"))
      .required(t("validation.required")),
    phone: Yup.string().required(t("validation.required")),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        t(
          "validation.password must contain at least eight characters, at least one number and both lower and uppercase letters"
        )
      )
      .required(t("validation.required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("validation.passwords don't  match"))
      .required(t("validation.required")),
  });
};

export const onSubmit = (values, language, dispatch) => {
  dispatch(register({ values: values, language: language }));
};
