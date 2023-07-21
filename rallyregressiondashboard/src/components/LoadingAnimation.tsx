import React from "react";
import "./LoadingAnimation.css"; // Import the CSS file for styling

const LoadingAnimation = (props: any) => {
  return (
    <div className={`${props.result && "top"}  loader`}>
      {/* You can add additional elements or text here */}
    </div>
  );
};

export default LoadingAnimation;
