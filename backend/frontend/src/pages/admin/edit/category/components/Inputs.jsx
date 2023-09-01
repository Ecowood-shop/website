// Import styles
import styled from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";
// Import components
import FormikControl from "../../../../../components/formik/FormikControl";

const Container = styled.div`
  display: grid;
  max-width: 80vw;
  grid-column-gap: 3rem;
  grid-template-columns: 1fr;

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

  ${respondTo.desktop`
    &:nth-of-type(1) {
      order: 1;
    }
    &:nth-of-type(2) {
      order: 3;
    }
    &:nth-of-type(3) {
      order: 5;
    }
    &:nth-of-type(4) {
      order: 2;
    }
    &:nth-of-type(5) {
      order: 4;
    }
    &:nth-of-type(6) {
      order: 6;
    }
  `}

  ${respondTo.tv`
    &:nth-of-type(1) {
      order: 1;
    }
    &:nth-of-type(2) {
      order: 3;
    }
    &:nth-of-type(3) {
      order: 5;
    }
    &:nth-of-type(4) {
      order: 2;
    }
    &:nth-of-type(5) {
      order: 4;
    }
    &:nth-of-type(6) {
      order: 6;
    }
  
  `}
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: var(--small-l);
  text-transform: capitalize;
`;

function Inputs({ t }) {
  return (
    <Container>
      {/* Category English */}
      <GridItem>
        <Label>
          {t("global.category")} ({t("global.english")})
        </Label>

        <FormikControl
          control="input"
          type="text"
          name="name_eng"
          placeholder="enter text..."
        />
      </GridItem>

      {/* Category Georgian */}
      <GridItem>
        <Label>
          {t("global.category")} ({t("global.georgian")})
        </Label>

        <FormikControl
          control="input"
          type="text"
          name="name"
          placeholder="enter text..."
          required
        />
      </GridItem>

      {/* Category Russian */}
      <GridItem>
        <Label>
          {t("global.category")} ({t("global.russian")})
        </Label>

        <FormikControl
          control="input"
          type="text"
          name="name_rus"
          placeholder="enter text..."
        />
      </GridItem>
    </Container>
  );
}

export default Inputs;
