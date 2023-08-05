// Placeholder image
import placeholder from "../../static/images/placeholder.png";

// Function for getting main image src if exists or placeholder
export const getMainImage = (product) => {
  const picture_set = [...product?.picture_set];
  const mainImage =
    picture_set?.length > 0
      ? picture_set?.sort((a, b) => a.ord - b.ord)[0]?.picture
      : placeholder;
  return mainImage;
};
