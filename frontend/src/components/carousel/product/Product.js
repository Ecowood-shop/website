// REACT
import React from "react";

// OTHERS
import "./product.css";

function Product(props) {
  return (
    <div className="carousel-product-container">
      <img src="https://nova.ge/images/thumbs/0016851_25l-fasadis-laqi-tiki-altax_600.jpeg" />
      <div className="text-container">
        <h2>{props.product.name_geo}</h2>
        <h2>{props.product.price} ლ</h2>
      </div>
    </div>
  );
}

export default Product;
