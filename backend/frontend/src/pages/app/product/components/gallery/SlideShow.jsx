// Import styles
import { styled } from "styled-components";
import "react-image-gallery/styles/css/image-gallery.css";
// Import components
import ImageGallery from "react-image-gallery";
import placeholder from "../../../../../static/images/placeholder.png";
// Import hooks
import useWindowDimensions from "../../../../../utils/hooks/useWindowDimensions";

const Container = styled.div``;

// Export Image Gallery
function SlideShow({ product }) {
  // Initialize hooks
  const { width } = useWindowDimensions();

  const images = [...product?.picture_set];
  return (
    <Container>
      <ImageGallery
        items={
          images?.length > 0
            ? images
                .sort((a, b) => a.ord - b.ord)
                .map((element) =>
                  Object.assign(
                    {},
                    { original: element.picture, thumbnail: element.picture }
                  )
                )
            : [{ original: placeholder, thumbnail: placeholder }]
        }
        thumbnailPosition={
          (width > 600 & width < 1025) || width > 1280 ? "right" : "bottom"
        }
        autoPlay={true}
        disableThumbnailScroll={true}
      />
    </Container>
  );
}

export default SlideShow;
