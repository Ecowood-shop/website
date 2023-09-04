// Import styles
import styled from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";
// Import components
import FormikControl from "../../../../components/formik/FormikControl";

const Container = styled.div`
  display: flex;
  gap: 2rem;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--small-l);

  & * {
    text-align: center;
    border: none !important;
    background: transparent;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &[type="number"] {
      appearance: textfield;
      -moz-appearance: textfield;
    }
  }

  ${respondTo.mobile`
    gap:0;

    input[type="number"] {
      max-width:5rem;
    }
  `}

  ${respondTo.lowTablet`
    gap:0;

    input[type="number"] {
      max-width:5rem;
    }
  `}
`;

function Inputs({ t, dropdownOptions }) {
  return (
    <Container>
      <Item>
        <FormikControl
          control="input"
          type="number"
          label="quantity"
          name="quantity"
          placeholder={t("global.quantity")}
        />
      </Item>

      {dropdownOptions.length > 1 && (
        <Item>
          <FormikControl
            control="select"
            name="color"
            options={dropdownOptions}
          />
        </Item>
      )}
    </Container>
  );
}

export default Inputs;
