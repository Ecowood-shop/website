// Import styles
import { useEffect } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  border-radius: 20px;
  background-color: whitesmoke;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  height: 140%;
  margin-left: calc(36px + 0.5rem);

  img {
    width: 25rem;
    height: 100%;
    border-radius: 20px;

    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
  }
`;

const Pagination = styled.div`
  bottom: 0;
  z-index: 1;
  display: flex;
  position: absolute;

  margin: auto auto 0.5rem calc(25rem + 0.5rem);
`;

const Page = styled.div`
  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;
  margin: 0.5rem;

  border-radius: 50%;
  border: 2px solid darkmagenta;
  box-shadow: 0 12px 24px rgba(DA, 12, 12, 0.2);
  background-color: ${(props) => (props.$active ? "darkmagenta" : "white")};
`;

const TextContainer = styled.div`
  flex: 1;
  height: 100%;
  width: fit-content;

  display: flex;
  margin-left: 1rem;
  flex-direction: column;
`;

const Text = styled.h3`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: var(--small-l);
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  padding: 1rem 0;x
`;

const Author = styled.p`
  font-size: var(--small-l);
`;

const Position = styled.p`
  font-size: var(--small-s);
`;

// Export block carousel content
function Content({ t, contentId, setContentId }) {
  // Toggle animation
  useEffect(() => {
    const elements = document.getElementById("carousel content").children;

    for (let i = 1; i < elements.length; i++) {
      elements[i].classList.remove("w3-animate-right");
      setTimeout(() => {
        elements[i].classList.add("w3-animate-right");
      }, 1);
    }
  }, [contentId]);

  return (
    <Container id="carousel content">
      {/* Image with buttons */}
      <ImageContainer>
        <img
          src={t(`blockCarousel.img${contentId}`)}
          alt={t(`blockCarousel.text${contentId}`)}
        />

        <Pagination>
          <Page
            onClick={() => setContentId(1)}
            $active={contentId === 1}
          ></Page>
          <Page
            onClick={() => setContentId(2)}
            $active={contentId === 2}
          ></Page>
          <Page
            onClick={() => setContentId(3)}
            $active={contentId === 3}
          ></Page>
          <Page
            onClick={() => setContentId(4)}
            $active={contentId === 4}
          ></Page>
        </Pagination>
      </ImageContainer>

      {/* Text container */}
      <TextContainer>
        <Text>{t(`blockCarousel.text${contentId}`)}</Text>
        <Title>
          <Author>{t(`blockCarousel.author${contentId}`)}</Author>
          <Position>{t(`blockCarousel.position${contentId}`)}</Position>
        </Title>
      </TextContainer>
    </Container>
  );
}

export default Content;
