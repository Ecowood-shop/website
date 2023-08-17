// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";
import { EcowoodSVG, ExpressSVG } from "../../../../../static/icons/delivery";
// Import components
import FormikControl from "../../../../../components/formik/FormikControl";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;

  input[type="radio"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
  }

  input[type="radio"]:checked + label {
    background-color: var(--color-primary);
    color: var(--white);

    & *{ 
     fill:white;
    }
  }
`;

const RadioContainer = styled.div`
  display: flex;
  margin: 1rem 0;
`;

const Label = styled.label`
  cursor: pointer;
  display: flex;
  padding: 0.5rem 2rem;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 20px;
  text-transform: capitalize;
  background-color: whitesmoke;
  transition: background 0.1s ease-in-out;

  ${respondTo.mobile`
    background-color:var(--whiteWithOpacity);
  `}

  ${respondTo.lowTablet`
    background-color:var(--whiteWithOpacity);
  `}

  &:last-of-type {
    margin-left: 1rem;
  }

  &:hover {
    background: transparent;
  }
`;

const IconContainer = styled.div`
  display: flex;

  svg {
    height: 5rem;
    width: 5rem;

    ${respondTo.mobile`
      width: 4rem;
      height: 4rem;
    `}

    ${respondTo.lowTablet`
      width: 4rem;
      height: 4rem;
    `}

    &:hover {
      stroke: none;
    }
  }
`;

const Header = styled.div`
  text-align: center;
`;

const HeaderText = styled.h1`
  color: var(--black);
  font-size: var(--medium-s);
`;

const Hr = styled.hr`
  border-color: var(--black);
`;
const TextContainer = styled.ol`
  margin-left: 1rem;
  list-style: circle;
`;

const Text = styled.li`
  font-size: var(--small-l);
`;

const ErrorContainer = styled.div``;

const ErrorText = styled.p`
  margin-left: 1rem;

  color: var(--red);
  font-size: var(--small-m);
  text-transform: capitalize;
`;

const LabelText = styled.p`
  text-align: center;
`;

// Export office container
function Office({ t, formik }) {
  const radioOptions = [
    {
      key: "ecowood",
      value: "ecowood",
      label: (
        <>
          <Label htmlFor="ecowood">
            <IconContainer>
              <EcowoodSVG />
            </IconContainer>
            <LabelText>{t("shipping method.ecowood")}</LabelText>
          </Label>
        </>
      ),
    },
    {
      key: "express",
      value: "express",
      label: (
        <>
          <Label htmlFor="express">
            <IconContainer>
              <ExpressSVG />
            </IconContainer>
            <LabelText> {t("shipping method.express branch")}</LabelText>
          </Label>
        </>
      ),
    },
  ];
  return (
    <Container className="w3-animate-right">
      <Header>
        <HeaderText>{t("shipping method.select branch")}</HeaderText>
      </Header>
      <Hr />

      <TextContainer>
        <Text>
          {t("shipping method.Working hours - Ecowood 10:00-18:00 (every day)")}
        </Text>
        <Text>
          {t(
            "shipping method.Working hours - Express branch 10:00-18:00 (every day)"
          )}
        </Text>
      </TextContainer>

      <RadioContainer>
        <FormikControl control="radio" name="_id" options={radioOptions} />
      </RadioContainer>

      <ErrorContainer>
        <ErrorText>{formik.errors["_id"]}</ErrorText>
      </ErrorContainer>
    </Container>
  );
}

export default Office;
