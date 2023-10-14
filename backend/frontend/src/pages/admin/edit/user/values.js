// Import yup
import * as Yup from "yup";

// Import update user action
import { updateUser } from "../../../../toolkit/users/actions";

// Initial values
export const initialValues = (user) => {
  return {
    first_name: user ? user.first_name : "",
    last_name: user ? user.last_name : "",
    email: user ? user.email : "",
    phone: user ? user.phone : "",
    is_staff: user?.is_staff ? "True" : "False",
  };
};

// Validation schema
export const validationSchema = (t) => {
  return Yup.object({
    first_name: Yup.string().required(t("validation.required")),
    last_name: Yup.string().required(t("validation.required")),
    email: Yup.string().email().required(t("validation.required")),
    phone: Yup.string().required(t("validation.required")),
    is_staff: Yup.boolean().required(t("validation.required")),
  });
};

// On submit function which updates user info
export const onSubmit = (values, dispatch, id, language) => {
  dispatch(updateUser({ formData: values, id: id, language: language }));
};
