// Import styles
import { styled } from "styled-components";
import image from "../../../../static/images/upload.jpeg";
import { respondTo } from "../../../../utils/styles/_respondTo";

// Import components
import FormikControl from "../../../../components/formik/FormikControl";

const Container = styled.div`
  display: grid;
  max-width: 80vw;
  column-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  justify-content: start;

  ${respondTo.mobile`
    grid-template-columns: 1fr;
  `}

  ${respondTo.lowTablet`
    max-width:100vw;
    justify-items: center;
    grid-template-columns: 1fr;
  `}

  & > div {
    margin: 0.5rem 0;
    max-width: 30rem;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;

  &:first-child {
    ${respondTo.lowTablet`
      width:100%;
    `}
  }

  ${respondTo.lowTablet`
      width:100%;
  `}
`;

const Select = styled.div`
  width: 15rem;
  max-width: 80vw;

  & > div > div > div:first-of-type {
    width: 15rem;
    max-width: 80vw;

    padding-left: 1rem;

    border-radius: 20px;
    border-color: white;

    font-size: var(--small-m);
    background-color: whitesmoke;

    ${respondTo.mobile`
      width: 100%;
      max-width:100%; 
      background-color:white;
    `}

    ${respondTo.lowTablet`
      width: 100%;
      max-width:100%; 
      background-color:white;
    `}
  }

  ${respondTo.mobile`
    width: 100%;
    max-width:100%;
  `}

  ${respondTo.lowTablet`
    width: 100%;
    max-width:100%;
  `}
`;

const File = styled.div`
  cursor: pointer;
  width: 100%;
  height: 3rem;
  margin-top: 0.5rem;
  border-radius: 20px;
  padding: 0.5rem 2rem;

  overflow: hidden;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;

  border-radius: 20px;
  background: url(${image}) center center no-repeat whitesmoke;

  background-size: 50px 50px;
  transition: background 0.1s ease-in-out;

  ${respondTo.mobile`
    background-color:var(--white);
  `}

  ${respondTo.lowTablet`
    background-color:var(--white);
  `}

  ${respondTo.desktop`
    &:hover {
      background-color: var(--white);
    }
  `}

  ${respondTo.tv`
    &:hover {
      background-color: var(--white);
    }
  `}
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;

  text-align: center;
  font-size: var(--small-l);
  text-transform: capitalize;

  ${respondTo.mobile`
      margin-bottom:1rem;
    `}
`;

function Inputs({ t, formik }) {
  const options = [
    { label: t("images.main"), value: 0 },
    { label: t("images.images"), value: 1 },
    { label: t("images.others"), value: 2 },
  ];
  return (
    <Container>
      <Item>
        <Label>{t("global.type")}</Label>
        <Select>
          <FormikControl
            control="autocomplete"
            name="type"
            formik={formik}
            options={options}
          />
        </Select>
      </Item>

      <Item>
        <Label htmlFor="file">
          {t("images.upload image")} <File> </File>
        </Label>
        <input
          id="file"
          name="image"
          type="file"
          hidden
          onChange={(event) => {
            formik.setFieldValue("image", event.currentTarget.files[0]);
          }}
        />
      </Item>
    </Container>
  );
}

export default Inputs;
