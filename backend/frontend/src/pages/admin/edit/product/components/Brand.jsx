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

// export product brand inputs
function Brand({ t }) {
  return (
    <GridGroup>
      {/* brand english */}
      <GridItem>
        <Label>
          {t("product.brand")} ({t("global.english")})
        </Label>

        <FormikControl
          control="input"
          type="text"
          label="brand_eng"
          name="brand_eng"
          placeholder="Enter text..."
        />
      </GridItem>

      {/* brand georgian */}
      <GridItem>
        <Label>
          {t("product.brand")} ({t("global.georgian")})
        </Label>

        <FormikControl
          control="input"
          type="text"
          label="brand_geo"
          name="brand_geo"
          placeholder="Enter text..."
        />
      </GridItem>

      {/* brand russian */}
      <GridItem>
        <Label>
          {t("product.brand")} ({t("global.russian")})
        </Label>

        <FormikControl
          control="input"
          type="text"
          label="brand_rus"
          name="brand_rus"
          placeholder="Enter text..."
        />
      </GridItem>
    </GridGroup>
  );
}

export default Brand;
