// REACT
import { useState } from "react";
import Select from "react-select";

// COMPONENTS
import ImageGallery from "react-image-gallery";
// OTHERS
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original:
      "https://nova.ge/images/thumbs/0016851_25l-fasadis-laqi-tiki-altax_600.jpeg",
    thumbnail:
      "https://nova.ge/images/thumbs/0016851_25l-fasadis-laqi-tiki-altax_600.jpeg",
  },
  {
    original:
      "https://nova.ge/images/thumbs/0016851_25l-fasadis-laqi-tiki-altax_600.jpeg",
    thumbnail:
      "https://nova.ge/images/thumbs/0016851_25l-fasadis-laqi-tiki-altax_600.jpeg",
  },
  {
    original:
      "https://nova.ge/images/thumbs/0016851_25l-fasadis-laqi-tiki-altax_600.jpeg",
    thumbnail:
      "https://nova.ge/images/thumbs/0016851_25l-fasadis-laqi-tiki-altax_600.jpeg",
  },

  {
    original:
      "https://nova.ge/images/thumbs/0016900_075l-khis-laqi-stsrafshrobadi-emali-tsabli-priala-altax_600.jpeg",
    thumbnail:
      "https://nova.ge/images/thumbs/0016900_075l-khis-laqi-stsrafshrobadi-emali-tsabli-priala-altax_600.jpeg",
  },
  {
    original:
      "https://nova.ge/images/thumbs/0016851_25l-fasadis-laqi-tiki-altax_600.jpeg",
    thumbnail:
      "https://nova.ge/images/thumbs/0016851_25l-fasadis-laqi-tiki-altax_600.jpeg",
  },
];
const priceOptions = [
  { value: "1", name: "ზრდადობით" },
  { value: "-1", name: "კლებადობით" },
];
function Section1({ product, styles, iframe }) {
  // VARIABLES
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState();

  console.log(color, size, quantity);
  return (
    <section className={styles.section1}>
      <div className={styles.imgContainer}>
        {iframe ? (
          <div className={styles.video} >
            <iframe
              src="https://www.youtube.com/embed/25TiKVqGI5Q?rel=0&autoplay=1"
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
            items={images}
            originalClass={styles.img}
            thumbnailPosition="right"
            autoPlay={true}
            disableThumbnailScroll={true}
          />
        )}
      </div>
      <div className={styles.table}>
        <h2>{product.name_geo}</h2>
        <p>
          <b>ბრენდი:</b>
          {product.brand}
        </p>
        <p>
          <b>კატეგორია:</b>
          {product.category}
        </p>
        <p>
          <b>ფასი:</b>
          {product.price}
        </p>

        {product.color ? (
          <>
            <Select
              options={priceOptions}
              isClearable={true}
              placeholder="ფერი"
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              onChange={(option) => setColor(option)}
            />
            {color && (
              <Select
                options={priceOptions}
                isClearable={true}
                placeholder="ზომა"
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option._id}
                onChange={(option) => setSize(option)}
              />
            )}
          </>
        ) : (
          <Select
            options={priceOptions}
            isClearable={true}
            placeholder="ზომა"
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
            onChange={(option) => setSize(option)}
          />
        )}
        {size && (
          <>
            {product.countInStock > 0 ? (
              <Select
                options={priceOptions}
                isClearable={true}
                placeholder="რაოდენობა"
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option._id}
                onChange={(option) => setQuantity(option)}
              />
            ) : (
              <p>არ არის მარაგში</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Section1;
