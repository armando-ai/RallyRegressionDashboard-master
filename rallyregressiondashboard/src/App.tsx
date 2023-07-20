import React, { useEffect, useState } from "react";

import "./App.css";
import RallyApi from "./rest-service/rally-api";
import { parseTestCase } from "./utils/parser";
import { TestCase } from "./types/rally/test-cases/test-case";
import { TestCaseDashBoard } from "./types/dashboard/test-case-dashboard";
import LoadingAnimation from "./components/LoadingAnimation";
import DashBoard from "./pages/DashBoard";
import LastResult from "./components/dashboard/last-resullt";

function App() {
  const [testCases, setTestCases] = useState<Array<TestCaseDashBoard>>([]);
  const [fetchedData, setFetchedData] = useState<boolean>(false);
  const [FilterVerdict, setFilterVerdict] = useState("");
  const [resultData, setresultData] = useState<any>({});

  const fetchData = async () => {
    window.open(
      "https://rally1.rallydev.com/#/196310419468d/dashboard",
      "_blank"
    );
    let testCaseRef: string;

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
    const testSetRef = await api.getTestSetRef("TS51048");
    if (testSetRef) {
      testCaseRef = await api.getTestCaseRef(testSetRef);
      const testCases = await api.getTestCases(testCaseRef);
      const parsedTestCases = await parseTestCase(testCases);
      setTestCases(parsedTestCases);
      setFetchedData(true);
    } else {
      console.log("bad test set");
    }
  };
  if (fetchedData === false) {
    fetchData();
  }

  const FilterTestCase = (verdict: string) => {
    setFilterVerdict(verdict);
    const filtered = testCases.filter((testCase: TestCaseDashBoard) =>
      testCase.lastVerdict?.includes(verdict)
    );
    setTestCases(filtered);
  };
  return (
    <div className="hidden">
      {fetchedData === false ? (
        <LoadingAnimation /> // Show the loading animation
      ) : (
        // Render your data or main content here
        <div>
          <input
            value={FilterVerdict}
            onChange={(e) => {
              FilterTestCase(e.target.value);
            }}></input>
          <DashBoard testCases={testCases} setResult={setresultData} />

          {resultData.build !== undefined ? (
            <LastResult result={resultData} />
          ) : (
            <div className="full">
              <br></br>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
