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

// export product safety standards
function SafetyStandards({ t }) {
  return (
    <GridGroup>
      {/* safety standards english */}
      <GridItem>
        <Label>
          {t("product.safety standard")} ({t("global.english")})
        </Label>

        <FormikControl
          control="textarea"
          name="safetyStandard_eng"
          placeholder="Enter text here..."
        />
      </GridItem>

      {/* safety standards georgian */}
      <GridItem>
        <Label>
          {t("product.safety standard")} ({t("global.georgian")})
        </Label>

        <FormikControl
          control="textarea"
          name="safetyStandard_geo"
          placeholder="Enter text here..."
        />
      </GridItem>

      {/* safety standards russian */}
      <GridItem>
        <Label>
          {t("product.safety standard")} ({t("global.russian")})
        </Label>

        <FormikControl
          control="textarea"
          name="safetyStandard_rus"
          placeholder="Enter text here..."
        />
      </GridItem>
    </GridGroup>
  );
}

export default SafetyStandards;
