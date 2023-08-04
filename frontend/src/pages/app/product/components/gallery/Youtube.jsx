// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";

const Container = styled.div`
  height: max(40vw, 40vh);

  ${respondTo.laptop`
    height: 100%;
    max-height:40rem;
  `}

  ${respondTo.desktop`
    height:40vw;
    max-height:40rem;
  `}
`;

// Function to normilize youtube url
function youtube_parser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
}

// Export youtube iframe
function Youtube({ url }) {
  return (
    <Container>
      <iframe
        src={`https://www.youtube.com/embed/${youtube_parser(
          url
        )}?rel=0&autoplay=1`}
        title="Youtube"
        width="100%"
        height="100%"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;  web-share"
        allowFullScreen
      ></iframe>
    </Container>
  );
}

export default Youtube;
