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


    
  const easeInOutQuad = (t: number) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };


  const scrollToBottom = () => {
    const windowHeight = window.innerHeight;
    const scrollTo = offset + windowHeight;

    const scrollStep = 10; // Adjust this value to control the scrolling speed
    const duration = 500; // Duration in milliseconds

    const scrollAnimation = (startTime: number) => {
      const currentTime = Date.now() - startTime;
      if (currentTime < duration) {
        const progress = currentTime / duration;
        const step = easeInOutQuad(progress) * scrollStep;
        window.scrollBy(0, step);
        requestAnimationFrame((timestamp) => scrollAnimation(startTime));
      } else {
        window.scrollTo(0, scrollTo);
      }
    };

    requestAnimationFrame((timestamp) => scrollAnimation(timestamp));
  };
  
  const str = [
    `Enter A Test Set.....`,
    `Explore.....`,
    `The Rally Custom Dashboard.....`,
  ];

  return (
    <div className="landing" >
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
      <button id="testButton" onClick={()=> {onUpdateTestSet(testSet);
      scrollToBottom();}}>
               
              </button>
    
    </div>
  );
};

export default Landing;
