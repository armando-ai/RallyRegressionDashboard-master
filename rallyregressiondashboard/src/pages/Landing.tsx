import React, { useEffect, useRef, useState } from "react";
import Typewriter from "../components/typewriter/TypeWriter";


const Landing = () => {
  const [testSet, settestSet] = useState("");
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
        onChange={(e) => settestSet(e.target.value.toUpperCase())}
        placeholder="Test Set Name..."
      />
    
    </div>
  );
};

export default Landing;
