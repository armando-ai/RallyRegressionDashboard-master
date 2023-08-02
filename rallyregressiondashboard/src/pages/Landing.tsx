import React, { useEffect, useRef, useState } from "react";

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

  return (
    <div className="landing">
      <input
        className="landingInput"
        onChange={(e) => {
          settestSet(e.target.value);
        }}></input>
    </div>
  );
};

export default Landing;
