// REACT
import { useState } from "react";

// COMPONENTS
import ImageGallery from "react-image-gallery";
import ColorPicker from "../../../../components/colorPicker/ColorPicker";

// FUNCTIONS
import useWindowDimensions from "../../../../functions/Window";

// OTHERS
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "./scss/section1.module.scss";

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

function Section1({ product, iframe,youtube }) {
  // VARIABLES
  const [color, setColor] = useState();
  const [quantity, setQuantity] = useState();
  const [message, setMessage] = useState();

  const { height, width } = useWindowDimensions();

  function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

  console.log(color, quantity);
  console.log(color);
  return (
    <section className={styles.section1}>
      <div className={styles.imgContainer}>
        {(youtube & iframe) ? (
          <div className={styles.video}>
            <iframe
              src={`https://www.youtube.com/embed/${youtube_parser(product.youtubeUrl)}?rel=0&autoplay=1`}
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
            thumbnailPosition={width > 800 ? "right" : "bottom"}
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
          <b>მოცულობა:</b>
         {product.size}
        </p>
        {color && (
          <>
            {product.countInStock > 0 ? (
              <>
                <label className={styles.selectContainer}>
                  <b>რაოდენობა:</b>
                  <input
                    type="number"
                    className={styles.select}
                    defaultValue={0}
                    max={4}
                    onChange={(e) => {
                      if (e.target.value <= 4 && e.target.value > 0) {
                        setMessage("");
                        setQuantity(e.target.value);
                      } else {
                        setMessage("მარაგშია 4");
                      }
                    }}
                  />
                </label>
                <p className={styles.error}>{message}</p>
              </>
            ) : (
              <p>არ არის მარაგში</p>
            )}
          </>
        )}

        <ColorPicker Changer={setColor} color={color} />

        <p className={styles.price}>
          <b>ფასი:</b>
          {product.price} ლ
        </p>
        {quantity && !message && (
          <div className={styles.btnContainer}>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              ყიდვა
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              დამატება
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Section1;
