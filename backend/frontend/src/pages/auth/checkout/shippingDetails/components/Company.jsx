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

// Export company inputs
function Company({ t }) {
  return (
    <Container key={2} className="w3-animate-right">
      <FormikControl
        control="input"
        type="text"
        label="company_name"
        name="company_name"
        placeholder={t("shipping details.company name")}
      />
      <FormikControl
        control="input"
        type="text"
        label="company_type"
        name="company_type"
        placeholder={t("shipping details.form of organization LLC/JSC/IE")}
      />
      <FormikControl
        control="input"
        type="text"
        label="company_id"
        name="company_id"
        placeholder={t("shipping details.identification code")}
      />
    </Container>
  );
}

export default Company;
