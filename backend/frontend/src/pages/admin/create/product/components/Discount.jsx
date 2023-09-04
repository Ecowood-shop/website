// import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";

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
  ${(props) => props.$date && "align-items: center;"}

  & select {
    width: 100%;
    max-width: 80vw;
    appearance: none;
    padding: 0.5rem 2rem;

    border: none;
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

  & > div:nth-of-type(2) {
    margin: 1rem 0;
  }
`;

const Label = styled.label`
  margin: 1rem 0 0.5rem 0;
  font-size: var(--small-m);
  text-transform: capitalize;
`;

// export product discount inputs
function Discount({ formik, t }) {
  const radioOptions = [
    { key: t("product.pick a discount"), value: "" },
    {
      key: t("product.no discount"),
      value: "0",
    },
    {
      key: t("product.discount"),
      value: "1",
    },
  ];

  return (
    <>
      <GridGroup>
        {/* select discount */}
        <GridItem>
          <Label htmlFor="discount">{t("product.discount")}</Label>
          <FormikControl
            control="select"
            name="discountType"
            options={radioOptions}
          />
        </GridItem>

        {String(formik.values.discountType) === "1" && (
          <>
            {/* start date */}
            <GridItem $date>
              <Label htmlFor="start_date">{t("product.start date")}</Label>
              <FormikControl control="date" name="start_date" />
              <FormikControl control="input" type="time" name="start_time" />
            </GridItem>
          </>
        )}
      </GridGroup>

      {/* create a discount */}
      {String(formik.values.discountType) === "1" && (
        <GridGroup>
          {/* discount percent */}
          <GridItem>
            <Label htmlFor="discountPercent">
              {t("product.discount percent")}
            </Label>

            <FormikControl
              control="input"
              type="number"
              name="discountPercent"
              placeholder="enter percent..."
            />
          </GridItem>

          {/* end date */}
          <GridItem $date>
            <Label htmlFor="end_Date">{t("product.end date")}</Label>
            <FormikControl control="date" name="end_date" />
            <FormikControl control="input" type="time" name="end_time" />
          </GridItem>
        </GridGroup>
      )}
    </>
  );
}

export default Discount;
