// Import styles
import styled from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";

const Container = styled.div`
  width: 100%;
  display: flex;
  margin: 2rem 0 1rem 0;

  ${respondTo.mobile`width:90%;`}
  ${respondTo.tablet`width:90%;`}
  ${respondTo.lowTablet`width:90%;`}
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

function Nav({ navigate, id, t }) {
  return (
    <Container className="w3-animate-right">
      <Button onClick={() => navigate(`/admin/products/${id}/variants`)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm0-96c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zM288 96c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm96 96c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32z" />
        </svg>
        {t("global.colors")}
      </Button>

      <Button onClick={() => navigate(`/admin/products/${id}/images`)} $last>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M152 120c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48S178.5 120 152 120zM447.1 32h-384C28.65 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM463.1 409.3l-136.8-185.9C323.8 218.8 318.1 216 312 216c-6.113 0-11.82 2.768-15.21 7.379l-106.6 144.1l-37.09-46.1c-3.441-4.279-8.934-6.809-14.77-6.809c-5.842 0-11.33 2.529-14.78 6.809l-75.52 93.81c0-.0293 0 .0293 0 0L47.99 96c0-8.822 7.178-16 16-16h384c8.822 0 16 7.178 16 16V409.3z" />
        </svg>
        {t("global.images")}
      </Button>
    </Container>
  );
}

export default Nav;
