// Import yup
import * as Yup from "yup";
// Import actions
import { resetPassword } from "../../../toolkit/auth/resetPasswordSlice";

export const initialValues = {
  password: "",
  confirm_password: "",
};

export const validationSchema = (t) => {
  return Yup.object({
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        t(
          "validation.password must contain at least eight characters, at least one number and both lower and uppercase letters"
        )
      )
      .required(t("validation.required")),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], t("validation.passwords don't  match"))
      .required(t("validation.required")),
  });
};

export const onSubmit = (values, dispatch, params, language) => {
  dispatch(
    resetPassword({
      id: params.id,
      token: params.token,
      formData: values,
      language: language,
    })
  );
};
