// import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";

// import components
import FormikControl from "../../../../../components/formik/FormikControl";

const Container = styled.div`
  & select {
    width: 100%;
    max-width: 80vw;
    appearance: none;
    padding: 0.5rem 2rem;

    border: none;
    border-radius: 20px;
    font-size: var(--small-l);
    background-color: whitesmoke;

    ${respondTo.mobile`
      background-color:white;
    `}

    ${respondTo.lowTablet`
      background-color:white;
    `}
  }
`;

function Select({ categories, t }) {
  const dropdownOptions = [{ key: t("global.category"), value: "" }];
  if (categories) {
    categories.forEach((category) => {
      dropdownOptions.push({ key: category.name, value: category._id });
    });
  }

  return (
    <Container>
      <FormikControl
        control="select"
        name="category"
        options={dropdownOptions}
      />
    </Container>
  );
}

export default Select;
