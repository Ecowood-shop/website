// Import yup
import * as Yup from "yup";

// Import create search params
import { createSearchParams } from "react-router-dom";

// Initial values
export const initialValues = {
  keyword: "",
  category: {},
};

// Validation schema
export const validationSchema = Yup.object({
  keyword: Yup.string(),
  category: Yup.object(),
});

// On submit function which navigates to search page
// with params category and keyword
export const onSubmit = (values, navigate) => {
  navigate({
    pathname: "products/search",
    search: `?${createSearchParams(
      Object.assign(
        {},
        !(Object.keys(values.category).length === 0) && {
          category: values.category.name,
        },
        values.keyword && { word: values.keyword }
      )
    )}`,
  });
};
