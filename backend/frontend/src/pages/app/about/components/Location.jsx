// Import styles
import { styled } from "styled-components";
// Import hooks
import { useState } from "react";
// Import components
import { LoaderMini } from "../../../../components";
const Iframe = styled.iframe`
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

// Export location component
const Location = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <LoaderMini color="darkmagenta" />}
      <Iframe
        src={props.company.location}
        onLoad={handleIframeLoad}
        allowFullScreen=""
        loading="lazy"
        title="location"
        referrerPolicy="no-referrer-when-downgrade"
      ></Iframe>
    </div>
  );
};
export default Location;
