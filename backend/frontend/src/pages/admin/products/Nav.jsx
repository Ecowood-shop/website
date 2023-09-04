// Import styles
import styled from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";

const Container = styled.div`
  display: flex;
`;

const Button = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;

  margin-left: auto;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;

  border: none;
  border-radius: 20px;

  color: var(--white);
  font-size: var(--small-l);
  transition: color 0.1s ease-in-out;
  background-color: var(--color-primary);

  svg {
    margin-right: 0.5rem;
    transition: fill 0.1s ease-in-out;

    fill: var(--white);
    width: var(--small-l);
    height: var(--small-l);
  }

  ${(props) => props.$last && "margin-left:1rem;"}
  ${(props) => props.$last && "  svg { width: var(--medium-s); height: var(--medium-s); }"}
  
  &:hover {
    ${respondTo.desktop`
      color: var(--whiteWithOpacity);
      svg {
        fill: var(--whiteWithOpacity);
      }
    `}

    ${respondTo.tv`
      color: var(--whiteWithOpacity);
      svg {
        fill: var(--whiteWithOpacity);
      }
    `}
  }
`;

function Nav({ navigate, t }) {
  return (
    <Container className="w3-animate-right">
      <Button onClick={() => navigate("/admin/categories")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
        </svg>
        {t("global.category")}
      </Button>

      <Button onClick={() => navigate("/admin/products/create")} $last>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <title>Add Circle</title>
          <path
            d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="32"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M256 176v160M336 256H176"
          />
        </svg>
        {t("global.product")}
      </Button>
    </Container>
  );
}

export default Nav;
