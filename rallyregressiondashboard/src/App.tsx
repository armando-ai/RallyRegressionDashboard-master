import React, { useEffect, useState } from "react";

import "./App.css";
import RallyApi from "./rest-service/rally-api";
import { parseTestCase } from "./utils/parser";
import { TestCase } from "./types/rally/test-cases/test-case";
import { TestCaseDashBoard } from "./types/dashboard/test-case-dashboard";
import LoadingAnimation from "./components/LoadingAnimation";
import DashBoard from "./pages/DashBoard";
import LastResult from "./components/dashboard/last-resullt";
import Filter from "./components/filter/filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChartPie } from "@fortawesome/free-solid-svg-icons";
function App() {
  const [testCases, setTestCases] = useState<Array<TestCaseDashBoard>>([]);
  const [originaltestCases, setOriginalTestCases] = useState<
    Array<TestCaseDashBoard>
  >([]);
  const [fetchedData, setFetchedData] = useState<boolean>(false);
  const [FilterVerdict, setFilterVerdict] = useState("");
  const [VerdictCheck, setVerdictCheck] = useState("");
  const [resultData, setresultData] = useState<any>({});
  const [Imbalance, setImbalance] = useState("");
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
      setOriginalTestCases(parsedTestCases);
      setFetchedData(true);
    } else {
      console.log("bad test set");
    }
  };
  if (fetchedData === false) {
    fetchData();
  }
  const rawTestCases = originaltestCases;

  const filterVerdict = (testCase: string) => {
    const tempArray = rawTestCases;
    setFilterVerdict(testCase);
    if (testCase.includes("Select Verdict")) {
      setTestCases(rawTestCases);
    } else {
      const temp = tempArray.filter((tc) => tc.lastVerdict === testCase);
      setTestCases(temp);
    }
  };
  const filterVerdictCheck = (testCase: string) => {
    const tempArray = rawTestCases;
    setVerdictCheck(testCase);
    if (testCase.includes("Select Verdict")) {
      setTestCases(rawTestCases);
    } else {
      const temp = tempArray.filter((tc) => tc.verdictCheck === testCase);
      setTestCases(temp);
    }
  };
  const [FilterType, setFilterType] = useState("filters");
  return (
    <div className="hidden">
      {fetchedData === false ? (
        <LoadingAnimation /> // Show the loading animation
      ) : (
        // Render your data or main content here
        <div>
          <DashBoard testCases={testCases} setResult={setresultData} />
          <div className="topLeftArea">
            <div className="icon-container">
              <div>
                <FontAwesomeIcon
                  icon={faFilter}
                  onClick={() => {
                    setFilterType("filters");
                  }}
                  className="filter-icon"
                />
              </div>

              <FontAwesomeIcon
                onClick={() => {
                  setFilterType("pie");
                }}
                icon={faChartPie}
                className="pie-chart-icon"
              />
            </div>
            <div
              className={`${
                FilterType === "pie" ? "" : "move-left"
              } contentTopLeft`}>
              <h1>Pie Chart</h1>
            </div>
            <div
              className={`${
                FilterType === "filters" ? "" : "move-left"
              } contentTopLeft`}>
              <Filter
                Verdict={FilterVerdict}
                setVerdict={filterVerdict}
                setVerdictCheck={filterVerdictCheck}
                VerdictCheck={VerdictCheck}
                Imbalance={Imbalance}
                setImbalance={setImbalance}></Filter>
            </div>
          </div>

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
