// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";

// Import components
import EndDate from "./EndDate";
import StartDate from "./StartDate";
import UserSelect from "./UserSelect";
import ProductSelect from "./ProductSelect";
import FormikControl from "../../../../../components/formik/FormikControl";

const Container = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  input {
    width: 30rem;
    max-width: 80vw;
    padding: 0.5rem 2rem;

    border-radius: 20px;
    border-color: white;

    font-size: var(--small-l);
    background-color: whitesmoke;

    ${respondTo.mobile`
      background-color:white;
    `}

    ${respondTo.lowTablet`
      background-color:white;
    `}
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
  }
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: var(--small-l);
  text-transform: capitalize;

  ${(props) => props.$date && "text-align:center;"}
`;

function Inputs({ formik, t }) {
  return (
    <Container>
      <Item>
        <Label>{t("user.user")}</Label>

        <UserSelect t={t} formik={formik} />
      </Item>

      <Item>
        <Label>{t("global.product")}</Label>
        <ProductSelect t={t} formik={formik} />
      </Item>

      <Item>
        <Label>{t("product.discount percent")}</Label>
        <FormikControl
          control="input"
          type="number"
          step={0.01}
          name="discountPercent"
          placeholder="enter percent..."
        />
      </Item>

      <Item>
        <Label $date>{t("product.start date")}</Label>
        <StartDate />
      </Item>

      <Item>
        <Label $date>{t("product.end date")}</Label>
        <EndDate />
      </Item>
    </Container>
  );
}

export default Inputs;
