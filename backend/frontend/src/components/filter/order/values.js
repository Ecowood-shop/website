// Import yup
import * as Yup from "yup";

// Import create search params
import { createSearchParams } from "react-router-dom";

// Initial values
export const initialValues = (values) => {
  return {
    keyword: values.word ? values.word : "",
    status: values.status ? values.status : "",
    id: values.id ? values.id : "",
  };
};

// Validation schema
export const validationSchema = Yup.object({
  keyword: Yup.string(),
  status: Yup.string(),
  id: Yup.string(),
});

// onSubmit function for admin orders page with params satus,id and keyword
export const onSubmit = (values, navigate) => {
  navigate({
    search: `?${createSearchParams(
      Object.assign(
        {},
        values.keyword && { word: values.keyword },
        values.status && { status: values.status },
        values.id && { id: values.id }
      )
    )}`,
  });
};
