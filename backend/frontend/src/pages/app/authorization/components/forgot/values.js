// yup
import * as Yup from "yup";

export const initialValues = {
  email: "",
};

export const validationSchema = (t) => {
  return Yup.object({
    email: Yup.string()
      .email(t("validation.invalid email format"))
      .required(t("validation.required")),
  });
};
