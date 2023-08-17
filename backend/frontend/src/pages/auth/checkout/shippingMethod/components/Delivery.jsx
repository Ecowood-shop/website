// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";
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
    & * {
      border-color: white;
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

  &::first-letter {
    text-transform: capitalize;
  }
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

  &:last-of-type {
    margin-left: 1rem;
  }

  &:hover {
    background: transparent;
  }

  ${respondTo.mobile`
    margin-left:0
    background-color:var(--whiteWithOpacity);
  `}

  ${respondTo.lowTablet`
    margin-left:0
    background-color:var(--whiteWithOpacity);
  `}

  ${respondTo.tablet`
    margin-left:0
  `}
`;

const RadioContainer = styled.div`
  gap: 1rem;
  display: grid;
  margin: 1rem 0;
  grid-template-columns: repeat(1, 1fr);

  ${respondTo.laptop`
    grid-template-columns: repeat(2, 1fr);   
  `}

  ${respondTo.desktop`
    grid-template-columns: repeat(2, 1fr);   
  `}

    ${respondTo.tv`
    grid-template-columns: repeat(2, 1fr);   
  `}
  input {
    display: none;
  }
`;

const LocationText = styled.h3`
  font-size: var(--medium-s);
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: end;
  height: 6rem;
  margin-bottom: 1rem;
`;

const Item = styled.div`
  width: max-content;
  ${(props) => props.$start && "align-self:start;"}
`;

const ItemPrice = styled.p`
  display: flex;
  align-items: center;

  font-size: var(--small-l);
  justify-content: center;
  border-bottom: 1px solid black;
`;

const ItemText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: var(--small-l);
`;

const ErrorContainer = styled.div``;

const ErrorText = styled.p`
  margin-left: 1rem;

  color: var(--red);
  font-size: var(--small-m);
  text-transform: capitalize;
`;

// Export delivery container
function Delivery({ formik, prices, t }) {
  const radioOptions = prices
    ? prices.map((price) => {
        return {
          key: "price" + price._id,
          value: String(price._id),
          label: (
            <>
              <Label htmlFor={"price" + price._id}>
                <LocationText>{price.location}</LocationText>
                <ItemContainer>
                  <Item>
                    <ItemPrice $right>{price.lowerLimit} ₾</ItemPrice>
                    <ItemText> {t("shipping method.service")} 1</ItemText>
                  </Item>

                  <Item $start>
                    <ItemPrice> {price.limit} ₾</ItemPrice>
                    <ItemText $middle>{t("shipping method.limit")}</ItemText>
                  </Item>

                  <Item>
                    <ItemPrice $left>{price.upperLimit} ₾</ItemPrice>
                    <ItemText> {t("shipping method.service")} 2</ItemText>
                  </Item>
                </ItemContainer>
              </Label>
            </>
          ),
        };
      })
    : [];
  return (
    <Container className="w3-animate-right">
      <Header>
        <HeaderText>{t("shipping method.select city")}</HeaderText>
      </Header>

      <Hr />
      <TextContainer>
        <Text>
          {t(
            "shipping method.if the total price of the cart exceeds the limit, you will use service 2"
          )}
        </Text>
        <Text>{t("shipping method.otherwise service 1")}</Text>
      </TextContainer>

      <RadioContainer>
        {prices && (
          <FormikControl control="radio" name="cityId" options={radioOptions} />
        )}
      </RadioContainer>

      <ErrorContainer>
        <ErrorText>{formik.errors["cityId"]}</ErrorText>
      </ErrorContainer>
    </Container>
  );
}

export default Delivery;
