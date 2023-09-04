// Import styles
import styled from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";
// Import components
import Select from "./Select";
import FormikControl from "../../../../../components/formik/FormikControl";

const Container = styled.div`
  display: grid;
  max-width: 80vw;
  grid-column-gap: 3rem;
  grid-template-columns: 1fr;

  ${respondTo.desktop`
    grid-template-columns: 1fr 1fr;
  `}

  ${respondTo.tv`
    grid-template-columns: 1fr 1fr;
  `}

  & > div {
    margin: 0.5rem 0;
    max-width: 30rem;
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

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: var(--small-l);
  text-transform: capitalize;
`;

function Inputs({ t, formik }) {
  return (
    <Container>
      {/* First name */}
      <GridItem>
        <Label>{t("user.first name")}</Label>

        <FormikControl
          control="input"
          type="text"
          name="first_name"
          placeholder="enter text..."
        />
      </GridItem>

      {/* Last name*/}
      <GridItem>
        <Label>{t("user.last name")}</Label>

        <FormikControl
          control="input"
          type="text"
          name="last_name"
          placeholder="enter text..."
          required
        />
      </GridItem>

      {/* E-mail */}
      <GridItem>
        <Label>{t("global.email")}</Label>

        <FormikControl
          control="input"
          type="text"
          name="email"
          placeholder="enter email..."
        />
      </GridItem>

      {/* Phone */}
      <GridItem>
        <Label>{t("user.phone")}</Label>

        <FormikControl
          control="input"
          type="tel"
          name="phone"
          placeholder="enter text..."
          required
        />
      </GridItem>

      {/* Status */}
      <GridItem>
        <Label>{t("global.status")} </Label>

        <Select t={t} formik={formik} />
      </GridItem>
    </Container>
  );
}

export default Inputs;
