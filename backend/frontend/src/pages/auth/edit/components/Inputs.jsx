// Import styles
import styled from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";
// Import components
import FormikControl from "../../../../components/formik/FormikControl";

const Container = styled.div`
  width: 30rem;
  max-width: 80vw;

  & > div {
    margin: 1rem 0;
  }
  
  input {
    width: 30rem;
    max-width: 80vw;
    padding: 0.5rem 2rem;

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

function Inputs({ t }) {
  return (
    <Container>
      <FormikControl
        control="input"
        type="text"
        label="firstName"
        name="firstName"
        className={"w3-animate-left"}
        placeholder={t("edit profile.first name")}
      />
      <FormikControl
        control="input"
        type="text"
        label="lastName"
        name="lastName"
        className={"w3-animate-left"}
        placeholder={t("edit profile.last name")}
      />
      <FormikControl
        control="input"
        type="tel"
        label="phone"
        name="phone"
        className={"w3-animate-left"}
        placeholder={t("edit profile.phone")}
      />
    </Container>
  );
}

export default Inputs;
