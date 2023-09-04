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

// export product size inputs
function Size({ t }) {
  return (
    <GridGroup>
      {/* size english */}
      <GridItem>
        <Label>
          {t("product.size")} ({t("global.english")})
        </Label>

        <FormikControl
          control="input"
          type="text"
          label="size_eng"
          name="size_eng"
          placeholder="Enter text..."
        />
      </GridItem>

      {/* size georgian */}
      <GridItem>
        <Label>
          {t("product.size")} ({t("global.georgian")})
        </Label>

        <FormikControl
          control="input"
          type="text"
          label="size_geo"
          name="size_geo"
          placeholder="Enter text..."
        />
      </GridItem>

      {/* size russian */}
      <GridItem>
        <Label>
          {t("product.size")} ({t("global.russian")})
        </Label>

        <FormikControl
          control="input"
          type="text"
          label="size_rus"
          name="size_rus"
          placeholder="Enter text..."
        />
      </GridItem>
    </GridGroup>
  );
}

export default Size;
