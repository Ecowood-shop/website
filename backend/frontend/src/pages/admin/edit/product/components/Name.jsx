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

// export product name inputs
function Name({ t }) {
  return (
    <GridGroup>
      {/* name english */}
      <GridItem>
        <Label>
          {t("product.name(product)")} ({t("global.english")})
        </Label>

        <FormikControl
          control="input"
          type="text"
          label="name_eng"
          name="name_eng"
          placeholder="Enter text..."
        />
      </GridItem>

      {/* name georgian */}
      <GridItem>
        <Label>
          {t("product.name(product)")} ({t("global.georgian")})
        </Label>

        <FormikControl
          control="input"
          type="text"
          label="name_geo"
          name="name_geo"
          placeholder="Enter text..."
        />
      </GridItem>

      {/* name russian */}
      <GridItem>
        <Label>
          {t("product.name(product)")} ({t("global.russian")})
        </Label>

        <FormikControl
          control="input"
          type="text"
          label="name_rus"
          name="name_rus"
          placeholder="Enter text..."
        />
      </GridItem>
    </GridGroup>
  );
}

export default Name;
