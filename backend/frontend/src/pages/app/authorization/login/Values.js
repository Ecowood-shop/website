// yup
import * as Yup from "yup";

// Import login
import { login } from "../../../../toolkit/user/actions";

export const initialValues = {
  email: "",
  password: "",
};

export const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().required("Required"),
});

export const onSubmit = (values, actions, dispatch) => {
  setTimeout(() => {
    dispatch(login(values));
    actions.setSubmitting(false);
  }, 1000);
};
