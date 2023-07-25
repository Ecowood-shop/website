// components
import ImageGallery from "react-image-gallery";
// hooks
import useWindowDimensions from "../../../../utils/hooks/useWindowDimensions";
// images
import placeholder from "../../../../static/images/placeholder.png";

function youtube_parser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

function SlideShow(props) {
  const { height, width } = useWindowDimensions();
  const images = [...props.product?.picture_set];

  return (
    <div className={props.styles.imgContainer}>
      {props.youtube & props.iframe ? (
        <div className={props.styles.video}>
          <iframe
            src={`https://www.youtube.com/embed/${youtube_parser(
              props.product.youtubeUrl
            )}?rel=0&autoplay=1`}
            title="Youtube"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
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
          originalClass={props.styles.img}
          thumbnailPosition={
            (width > 800) & (width < 1200) || width > 1600 ? "right" : "bottom"
          }
          autoPlay={true}
          disableThumbnailScroll={true}
        />
      )}
    </div>
  );
}

export default SlideShow;
