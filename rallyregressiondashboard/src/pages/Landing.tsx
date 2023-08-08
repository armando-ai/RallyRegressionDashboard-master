import React, { useEffect, useRef, useState } from "react";
import Typewriter from "../components/typewriter/TypeWriter";

const Landing = ({ initialTestSet, onUpdateTestSet, fetchedUpdateData }: any) => {
  const [testSet, settestSet] = useState(initialTestSet); // Use initial value

 
 
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
        onChange={(e) => {
          const newValue = e.target.value.toUpperCase();
          settestSet(newValue);
        }}
        placeholder="Test Set Name..."
      />
      <button
        id="testButton"
        className={`${fetchedUpdateData && "spin"}`}
        onClick={() => {
          onUpdateTestSet(testSet);
        }}></button>
    </div>
  );
};

export default Landing;
