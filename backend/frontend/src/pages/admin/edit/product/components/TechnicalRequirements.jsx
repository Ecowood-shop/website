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

// export product technical requirements
function TechnicalRequirements({t}) {
  return (
    <GridGroup>
      {/* technical requirements english */}
      <GridItem>
        <Label>
          {t("product.technical requirements")} ({t("global.english")})
        </Label>

        <FormikControl
          control="textarea"
          name="technicalRequirements_eng"
          placeholder="Enter text here..."
        />
      </GridItem>

      {/* technical requirements georgian */}
      <GridItem>
        <Label>
          {t("product.technical requirements")} ({t("global.georgian")})
        </Label>

        <FormikControl
          control="textarea"
          name="technicalRequirements_geo"
          placeholder="Enter text here..."
        />
      </GridItem>

      {/* technical requirements russian */}
      <GridItem>
        <Label>
          {t("product.technical requirements")} ({t("global.russian")})
        </Label>

        <FormikControl
          control="textarea"
          name="technicalRequirements_rus"
          placeholder="Enter text here..."
        />
      </GridItem>
    </GridGroup>
  );
}

export default TechnicalRequirements;
