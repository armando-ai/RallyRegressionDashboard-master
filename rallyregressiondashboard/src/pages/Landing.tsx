import React, { useEffect, useRef, useState } from "react";
import Typewriter from "../components/typewriter/TypeWriter";


const Landing = ({ initialTestSet, onUpdateTestSet }: any) => {
  const [testSet, settestSet] = useState(initialTestSet); // Use initial value

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.removeEventListener("scroll", onScroll);

    window.addEventListener("scroll", onScroll, { passive: true });
    console.log(offset);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  const str = [
    `Enter A Test Set.....`,
    `Explore.....`,
    `The Rally Custom Dashboard.....`,
  ];
  return (
    <div className="landing">
      <Typewriter strings={str} />
      <input
        className="landingInput"
        type="text"
        value={testSet}
        style={{ fontWeight: "100!important" }}
        onChange={(e) =>{
          const newValue = e.target.value.toUpperCase();
          settestSet(newValue);
        }}
        placeholder="Test Set Name..."
      />
      <button id="videoButton" onClick={()=> {onUpdateTestSet(testSet)}}>
                View Video
              </button>
    
    </div>
  );
};

export default Landing;
