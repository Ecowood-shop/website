// Import yup
import * as Yup from "yup";

// Import create search params
import { createSearchParams } from "react-router-dom";

// Initial values
export const initialValues = (values) => {
  return {
    orderBy: values.orderBy ? values.orderBy : "",
    keyword: values.word ? values.word : "",
    category: values.category ? values.category : "",
  };
};

// Validation schema
export const validationSchema = Yup.object({
  orderBy: Yup.string(),
  keyword: Yup.string(),
  category: Yup.string(),
});

// On submit function which navigates to search page
// with params category and keyword
export const onSubmit = (values, navigate, categories) => {
  console.log(values);
  const category =
    categories?.length > 0
      ? categories.find((category) => category._id === Number(values.category))
          ?.name
      : "";

  navigate({
    search: `?${createSearchParams(
      Object.assign(
        {},
        category && { category: category },
        values.keyword && { word: values.keyword },
        values.orderBy && { orderby: values.orderBy }
      )
    )}`,
  });
};
