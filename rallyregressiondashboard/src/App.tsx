import React, { useState } from "react";

import "./App.css";
import "./imageTest/image";
import RallyApi from "./rest-service/rally-api";
import ImageComponent from "./imageTest/image";

function App() {
  const [fetchedData, setFetchedData] = useState<boolean>(false);
  if (fetchedData === false) {
    setFetchedData(true);
    if (
      !window.location.href
        .toString()
        .includes("?apiKey=_QBmqvSMdTDGt8hJNq2LK3t1KLhWby0o6pyUJSgPMqw")
    ) {
      window.location.href =
        window.location.href.toString() +
        "?apiKey=_QBmqvSMdTDGt8hJNq2LK3t1KLhWby0o6pyUJSgPMqw";
    }

    const api = new RallyApi();
    const testset = api.getTestSetRef("TS51048");
    console.log(testset);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <ImageComponent />
        <a
          className="App-link"
          href="/pages/DashBoard"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
