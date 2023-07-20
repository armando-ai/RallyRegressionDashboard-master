import React, { useState } from "react";
import { LastResultData } from "../../types/dashboard/last-result-data";
import Moment from "moment";
const LastResult = (props: any) => {
  const data: any = props.result;
  Moment.locale("en");
  const date = Moment(data.date);
  const formattedDate = date.format("MMMM DD, YYYY");
  const [showPopup, setShowPopup] = useState(false);
  const notes: string = data.notes;
  const wordsArray = notes.split("<br>");

  // Create an array to store lines
  const linesArray = [];

  // Group words into lines (each containing up to 10 words)
  for (let i = 0; i < wordsArray.length; i += 10) {
    const line = wordsArray.slice(i, i + 10).join(" ");
    linesArray.push(line);
  }

  // Join the lines with line breaks

  // Step 2: Function to toggle popup visibility
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div className="col-item">
      <div className="row-result">
        <h1>Build:</h1>
        <p>{data.build}</p>
      </div>
      <div className="row-result">
        <h1>Date:</h1>
        <p>{formattedDate}</p>
      </div>
      <div className="row-result">
        <h1>Last Verdict:</h1>
        <p>{data.verdict}</p>
      </div>
      <div className="row-result">
        <h1>Checker:</h1>
        <p>{data.verdictCheck}</p>
      </div>
      <div className="result">
        <h1>Notes:</h1>
        {linesArray.map((paragraph, index) => (
          <p className="ptag" key={index}>
            {paragraph}
          </p>
        ))}
      </div>

      <div className="result-img">
        {data.attachments === null ? (
          <h1>No image content</h1>
        ) : (
          <img onClick={togglePopup} src={`${data.attachments}`} height={300} />
        )}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <span className="close" onClick={togglePopup}>
              &times;
            </span>
            <img src={`${data.attachments}`} alt="Full-screen" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LastResult;
