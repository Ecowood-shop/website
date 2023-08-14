// yup
import * as Yup from "yup";

// Import login
import { login } from "../../../../../toolkit/user/actions";

export const initialValues = {
  email: "",
  password: "",
};

export const validationSchema = (t) => {
  return Yup.object({
    email: Yup.string()
      .email(t("validation.invalid email format"))
      .required(t("validation.required")),
    password: Yup.string().required(t("validation.required")),
  });
};

export const onSubmit = (values, dispatch) => {
  dispatch(login(values));
};
