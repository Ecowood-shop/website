// Import styles
import styled from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Import hooks
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormikContext } from "formik";
// Import formik configuration
import FormikControl from "../../formik/FormikControl";
// Import actions
import { getCategories } from "../../../toolkit/category/actions";

// Container
const Container = styled.div`
  width: 40%;

  ${respondTo.mobile`
    width:50%;
  `}

  ${respondTo.lowTablet`
    width:50%;
  `}

  & > div {
    height: 100%;
    width: 100%;
    select {
      height: 100%;
      width: 100%;
      padding: 0.7rem 1.5rem 0.7rem 1.5rem;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      border: 3px solid var(--darkmagenta);
      border-radius: 100px;

      color: var(--darkmagenta);
      font-size: var(--small-m);
      text-transform: capitalize;
      background-color: whitesmoke;
    }
  }
`;

// Export category select
function CategorySelect() {
  // Initializing hooks
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation(["components"]);
  // Hooks
  const { submitForm, setFieldValue } = useFormikContext();

  // Get categories from category slice
  const { categories } = useSelector((state) => state.categories);

  const dropdownOptions = [{ key: t("global.category"), value: "" }];
  if (categories) {
    categories.forEach((category) => {
      dropdownOptions.push({ key: category.name, value: category._id });
    });
  }

  // Get categories according to language
  useEffect(() => {
    dispatch(getCategories({ language: i18n.language }));
  }, [dispatch, i18n.language]);

  useEffect(() => {
    setTimeout(() => submitForm(), 1);
  }, [dispatch, categories]);

  // Functions
  const setCategoryField = (value) => {
    setFieldValue("category", value);
    submitForm();
  };
  return (
    <Container>
      <FormikControl
        control="select"
        name="category"
        options={dropdownOptions}
        onChange={(event) => setCategoryField(event.target.value)}
      />
    </Container>
  );
}

export default CategorySelect;
