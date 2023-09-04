// Import styles
import { styled } from "styled-components";
import { ErrorSVG } from "../../../static/icons/components";
import { respondTo } from "../../../utils/styles/_respondTo";

// Import hooks
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

// Import components
import Variant from "./components/Variant";
import { Loader, ErrorMessage } from "../../../components";

// Import actions
import { reset } from "../../../toolkit/variant/variantSlice";
import { getColors } from "../../../toolkit/color/colorSlice";
import { getVariants } from "../../../toolkit/variant/actions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  max-width: 1400px;
  padding: 3rem;

  ${respondTo.mobile`
    width:100%;
    padding: 3rem 1rem;
  `}

  ${respondTo.lowTablet`
    width:80%;
    padding: 3rem 1rem;
  `}

  ${respondTo.tablet`
    width:80%;
    padding: 3rem 1rem;
  `}

  ${respondTo.laptop`
    width:80%;
    padding: 3rem 1rem;
  `}
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
`;

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;

  gap: 0.5rem;
  margin: 1rem 0;
  padding: 1rem 0;

  color: var(--red);
  border-radius: 20px;
  font-size: var(--small-l);
  text-transform: capitalize;

  svg {
    stroke: var(--red);
    height: 24px;
    width: 24px;
  }

  ${respondTo.desktop`
    margin:7rem 0 1rem 0;
  `}
`;

// Export product variants page
function Variants() {
  // Initialize hooks
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation(["admin"]);

  // Get product variants from store
  const variantsSlice = useSelector((state) => state.variants);
  const { error, isLoading, variants, success } = variantsSlice;

  // Get colors to choose from store
  const { colors } = useSelector((state) => state.colors);

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVariants({ id: id }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, success, id]);
  return (
    <Container>
      <InnerContainer className="w3-animate-right">
        {colors && <Variant colors={colors} id={id} t={t} />}
      </InnerContainer>

      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}
      {isLoading ? (
        <Loader color={"darkmagenta"} />
      ) : variants?.length > 0 ? (
        <FlexContainer className="w3-animate-right">
          {variants.map((variant) => (
            <Variant variant={variant} key={variant.id} t={t} />
          ))}
        </FlexContainer>
      ) : (
        <MessageContainer>
          <ErrorSVG />
          <p>{t("global.no variants found")}</p>
        </MessageContainer>
      )}
    </Container>
  );
}

export default Variants;
