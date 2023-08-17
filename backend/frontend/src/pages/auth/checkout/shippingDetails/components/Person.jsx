// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";
// Import components
import FormikControl from "../../../../../components/formik/FormikControl";

const Container = styled.div`
  width: 80%;

  ${respondTo.mobile`
    width: 90%;
  `}

  input {
    width: 100%;
    margin: 0.5rem 0;
    padding: 0.5rem 2rem;

    font-size: var(--small-l);
    background-color: whitesmoke;

    ${respondTo.mobile`
      background-color:var(--white);
    `}

    ${respondTo.lowTablet`
      background-color:var(--white);
    `}
  }
  & * {
    top: 0;
    font-size: var(--small-m);
  }
`;

// Export person inputs
function Person({ t }) {
  return (
    <Container key={1} className="w3-animate-right">
      <FormikControl
        control="input"
        type="text"
        label="first_name"
        name="first_name"
        placeholder={t("shipping details.first name")}
      />
      <FormikControl
        control="input"
        type="text"
        label="last_name"
        name="last_name"
        placeholder={t("shipping details.last name")}
      />
      <FormikControl
        control="input"
        type="text"
        label="id"
        name="id"
        placeholder={t("shipping details.personal No")}
      />
    </Container>
  );
}

export default Person;
