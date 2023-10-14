// Import yup
import * as Yup from "yup";

// Import create category action
import { createCategory } from "../../../../toolkit/category/actions";

// Initial values
export const initialValues = {
  name: "",
  name_eng: "",
  name_rus: "",
};

// Validation schema
export const validationSchema = (t) => {
  return Yup.object({
    name_eng: Yup.string(),
    name: Yup.string().required(t("validation.required")),
    name_rus: Yup.string(),
  });
};

// On submit function which adds category
export const onSubmit = (values, language, dispatch) => {
  dispatch(createCategory({ values: values, language: language }));
};
