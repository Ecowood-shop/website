// Import yup
import * as Yup from "yup";

// Import create search params
import { createSearchParams } from "react-router-dom";

// Initial values
export const initialValues = (values) => {
  return {
    keyword: values.word ? values.word : "",
  };
};

// Validation schema
export const validationSchema = Yup.object({
  keyword: Yup.string(),
});

// onSubmit function for admin users page with params keyword
export const onSubmit = (values, navigate) => {
  navigate({
    search: `?${createSearchParams(
      Object.assign({}, values.keyword && { word: values.keyword })
    )}`,
  });
};
