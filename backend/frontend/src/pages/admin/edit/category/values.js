// Import yup
import * as Yup from "yup";

// Import update category
import { updateCategory } from "../../../../toolkit/category/actions";

// Initial values
export const initialValues = (category) => {
  return {
    name: category ? category.name : "",
    name_eng: category ? category.name_eng : "",
    name_rus: category ? category.name_rus : "",
  };
};

// Validation schema
export const validationSchema = (t) => {
  return Yup.object({
    name_eng: Yup.string(),
    name: Yup.string().required(t("validation.required")),
    name_rus: Yup.string(),
  });
};

// On submit function which updates category based on id
export const onSubmit = (values, dispatch, id, language) => {
  dispatch(updateCategory({ formData: values, id: id, language: language }));
};
