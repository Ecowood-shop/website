// Import styles
import styled from "styled-components";
import { CloseSVG } from ".././../../../static/icons/components";
import { respondTo } from "../../../../utils/styles/_respondTo";

// Import actions
import { deleteVariant } from "../../../../toolkit/variant/actions";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${(props) => (props.$margin ? "0;" : "5rem;")};

  ${respondTo.mobile`
    margin-left:0;
    margin-top:1rem;
  `}

  ${respondTo.lowTablet`
    margin-left:0;
    margin-top:1rem;
  `}
`;

const StyledButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  width: max-content;
  height: min-content;
  padding: 0.5rem 2rem;

  border: none;
  border-radius: 20px;

  color: var(--white);
  font-size: var(--small-l);
  background-color: ${(props) =>
    props.$delete ? "white" : "var(--color-primary)"};
  transition: color 0.1s ease-in-out;

  svg {
    width: 2rem;
    height: 2rem;
    fill: var(--red);
    transition: fill 0.1s ease-in-out;
  }

  ${respondTo.desktop`
    &:hover{
      color:var(--whiteWithOpacity);
      svg{
        fill:var(--redWithOpacity)
      }
    }
  `}

  ${respondTo.tv`
    &:hover{
      color:var(--whiteWithOpacity);
      svg{
        fill:var(--redWithOpacity)
      }
    }
  `};
`;

function Button({ t, i18n, dispatch, variant }) {
  return (
    <Container $margin={variant}>
      <StyledButton type="submit">
        {!variant ? t("global.create") : t("global.edit")}
      </StyledButton>

      {/* Show delete button if variant */}
      {variant && (
        <StyledButton
          type="button"
          $delete
          onClick={() =>
            dispatch(deleteVariant({ id: variant.id, language: i18n.language }))
          }
        >
          <CloseSVG />
        </StyledButton>
      )}
    </Container>
  );
}

export default Button;
