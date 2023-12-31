import React, { useState } from "react";
import { LastResultData } from "../../types/dashboard/last-result-data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo } from "@fortawesome/free-solid-svg-icons";

import Moment from "moment";
const LastResult = (props: any) => {
  const [media, setMedia] = useState("image");
  const data: any = props.result;
  Moment.locale("en");
  const date = Moment(data.date);
  const formattedDate = date.format("MMMM DD, YYYY");
  const [showPopup, setShowPopup] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const notes: string = data.notes;
  const wordsArray = notes.split("<br>");

  // Create an array to store lines
  const linesArray = [];

  // Group words into lines (each containing up to 10 words)
  for (let i = 0; i < wordsArray.length; i += 10) {
    const line = wordsArray.slice(i, i + 10).join(" ");
    linesArray.push(line);
  }

  const regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g;

  // Extracting all matches
  const links = [];
  let match;
  while ((match = regex.exec(data.notes)) !== null) {
    links.push(match[2]);
  }

  // Join the lines with line breaks

  // Step 2: Function to toggle popup visibility
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const toggleVideoPopup = () => {
    setShowVideoPopup(!showVideoPopup);
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

      <div className="media-box">
        <div className="media-switch">
          <div className={`selected ${media !== "image" && "sel-vid"}`}></div>
          <div
            className={`media-switch-icon ${media === "image" && "sel-icon"}`}
            onClick={() => setMedia("image")}>
            <FontAwesomeIcon icon={faImage} />
          </div>
          <div
            className={`media-switch-icon ${media === "video" && "sel-icon"}`}
            onClick={() => setMedia("video")}>
            <FontAwesomeIcon icon={faVideo} />
          </div>
        </div>
        <div
          className={` ${
            media !== "image"
              ? "animate__animated animate__backOutRight"
              : "animate__animated animate__backInRight"
          } media-content`}>
          {data.attachments === null ? (
            <h1>No image content</h1>
          ) : (
            <img
              onClick={togglePopup}
              src={`${data.attachments}`}
              height={300}
            />
          )}
        </div>
        <div
          className={` ${
            media !== "video"
              ? "animate__animated animate__backOutRight"
              : "animate__animated animate__backInRight"
          } media-content`}>
         
            {links.length === 0 ? (
              <h1>No video content</h1>
            ) : (
              <button id="videoButton" onClick={toggleVideoPopup}>
                View Video
              </button>
            )}
         
        </div>
      </div>

      {showVideoPopup && links.length > 0 && (
        <div className="popup-overlay">
          <div className="popup">
            <span className="close" onClick={toggleVideoPopup}>
              &times;
            </span>
            <iframe
              width="1400"
              height="650"
              src={`${links[0]}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          </div>
        </div>
      )}

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
