// Import styles and icons
import { styled } from "styled-components";

// Import hooks
import { useDispatch } from "react-redux";

// Import actions
import { deleteImage } from "../../../../toolkit/image/imageSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: var(--white);

  border-radius: 20px;

  &:hover button {
    visibility: visible;
  }
`;

const Img = styled.img`
  width: 100%;
  background-color: var(--color-white);
  padding: 1rem;
`;

const Header = styled.h2`
  margin: 0;
  text-align: center;
  color: var(--white);
  font-size: var(--medium-s);

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: var(--color-primary);
`;

const Button = styled.button`
  bottom: 0;
  width: 100%;
  display: flex;
  visibility: hidden;
  position: absolute;
  height: calc(100% - calc(var(--medium-s) * 2 - 0.5rem));

  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 20px;
  background: transparent;

  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: visibility 0.1s ease-in-out;

  svg {
    cursor: pointer;

    width: 2rem;
    height: 2rem;
    fill: var(--color-primary);
    transition: fill 0.1s ease-in-out;

    &:hover {
      fill: var(--color-error);
    }
  }
`;

function Image({ id, image, order, i18n }) {
  // Initialize hooks
  const dispatch = useDispatch();

  return (
    <Container>
      <Header>{order}</Header>
      <Img src={image.picture} alt="product" />
      <Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          onClick={() =>
            dispatch(deleteImage({ id: id, language: i18n.language }))
          }
        >
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
        </svg>
      </Button>
    </Container>
  );
}

export default Image;
