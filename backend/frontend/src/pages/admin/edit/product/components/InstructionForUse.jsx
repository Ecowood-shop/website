// import styles
import { styled } from "styled-components";

// import components
import FormikControl from "../../../../../components/formik/FormikControl";

const GridGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Label = styled.label`
  margin: 1rem 0 0.5rem 0;
  font-size: var(--small-m);
  text-transform: capitalize;
`;

// export product instruction for use
function InstructionForUse({ t }) {
  return (
    <GridGroup>
      {/* terms of use english */}
      <GridItem>
        <Label>
          {t("product.terms of use")} ({t("global.english")})
        </Label>

        <FormikControl
          control="textarea"
          name="instructionForUse_eng"
          placeholder="Enter text here..."
        />
      </GridItem>

      {/* terms of use georgian */}
      <GridItem>
        <Label>
          {t("product.terms of use")} ({t("global.georgian")})
        </Label>

        <FormikControl
          control="textarea"
          name="instructionForUse_geo"
          placeholder="Enter text here..."
        />
      </GridItem>

      {/* terms of use russian */}
      <GridItem>
        <Label>
          {t("product.terms of use")} ({t("global.russian")})
        </Label>

        <FormikControl
          control="textarea"
          name="instructionForUse_rus"
          placeholder="Enter text here..."
        />
      </GridItem>
    </GridGroup>
  );
}

export default InstructionForUse;
