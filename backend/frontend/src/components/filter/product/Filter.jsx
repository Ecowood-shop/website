// Import styles
import styled from "styled-components";
// Import components
import FilterPanel from "../components/FilterPanel";
import SelectPanel from "../components/SelectPanel";
// Import formik configuration
import { useEffect } from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initialValues, validationSchema, onSubmit } from "./values";
// Import actions
import { getCategories } from "../../../toolkit/category/actions";

// Container which contains form
const Container = styled.div`
  form {
    display: flex;
    @media screen and (max-width: 1600px) {
      flex-direction: column;
    }
  }
`;

// Export product filter
function Filter() {
  // Initializing hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation(["components"]);

  // Get categories from category slice
  const { categories } = useSelector((state) => state.categories);

  // Get query params
  const word = searchParams.get("word");
  const orderBy = searchParams.get("orderby");
  const currentCategory = searchParams.get("category");

  const category =
    categories?.length > 0
      ? categories.find((category) => category.name === currentCategory)?._id
      : "";

  // Get categories according to language
  useEffect(() => {
    dispatch(getCategories({ language: i18n.language }));
  }, [dispatch, i18n.language]);

  const values = { word, orderBy, category };

  return (
    <Container className="w3-animate-right">
      <Formik
        initialValues={initialValues(values)}
        validationSchema={validationSchema}
        onSubmit={(e) => onSubmit(e, navigate, categories)}
      >
        {() => {
          return (
            <Form>
              <FilterPanel />
              <SelectPanel category price />
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}

export default Filter;
