// import styles
import { styled } from "styled-components";

// import components
import Select from "./Select";
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
function Details({ t, categories }) {
  return (
    <GridGroup>
      {/* youtube */}
      <GridItem>
        <Label>Youtube</Label>

        <FormikControl
          control="input"
          type="url"
          label="youtubeUrl"
          name="youtubeUrl"
          placeholder="Enter text..."
        />
      </GridItem>

      {/* coverage length */}
      <GridItem>
        <Label>{t("product.coverage length")}</Label>

        <FormikControl
          control="input"
          type="number"
          label="coverageLength"
          name="coverageLength"
          placeholder="Enter text..."
        />
      </GridItem>

      {/* category */}

      <GridItem>
        <Label>{t("global.category")}</Label>

        <Select categories={categories} t={t} />
      </GridItem>

      {/* price */}
      <GridItem>
        <Label>{t("product.price")}</Label>

        <FormikControl
          control="input"
          type="number"
          label="price"
          name="price"
          step={0.01}
          placeholder="Enter price..."
        />
      </GridItem>
    </GridGroup>
  );
}

export default Details;
