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
import PieChart from "./components/piechart/CustomPieChart";
import VCheck from "./components/piechart/VCheckPie";
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
  const [testCasesImbalance, setImbalanceTestCases] = useState([]);
  const [fetchedUpdateData, setFetchedUpdateData] = useState<boolean>(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState("");
  const fetchData = async () => {
    let testCaseRef: string;

    if (
      !window.location.href
        .toString()
        .includes("?apiKey=_QBmqvSMdTDGt8hJNq2LK3t1KLhWby0o6pyUJSgPMqw")
    ) {
      window.location.href =
        window.location.href.toString() +
        "?apiKey=_QBmqvSMdTDGt8hJNq2LK3t1KLhWby0o6pyUJSgPMqw";
      window.open(
        "https://rally1.rallydev.com/#/196310419468d/dashboard",
        "_blank"
      );
    }
    const api = new RallyApi();
    const testSetRef = await api.getTestSetRef("TS51048");
    if (testSetRef) {
      testCaseRef = await api.getTestCaseRef(testSetRef);
      const testCases = await api.getTestCases(testCaseRef);
      setImbalanceTestCases(testCases);
      const parsedTestCases = await parseTestCase(testCases);
      const { pie, pieCheck } = await createPieData(parsedTestCases);
      setTestCases(parsedTestCases);
      setOriginalTestCases(parsedTestCases);
      setFetchedData(true);
      setPieData(pie);
      setPieData2(pieCheck);
    } else {
      console.log("bad test set");
    }
  };
  if (fetchedData === false) {
    fetchData();
  }
  const rawTestCases = originaltestCases;

  const filterImbalance = async (Imbalance: string) => {
    setImbalance(Imbalance);
    setFetchedUpdateData(true);
    const parsedTestCases = await parseTestCase(testCasesImbalance, +Imbalance);
    setTestCases(parsedTestCases);
    setFetchedUpdateData(false);
  };
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
  const [pieData, setPieData] = useState<any>("");
  const [pieData2, setPieData2] = useState<any>("");
  const createPieData = async (tempArray: any) => {
    let regPass = 0;
    let regFail = 0;
    const reg = ["Pass", "Fail"];
    for (let index = 0; index < tempArray.length; index++) {
      const element = tempArray[index];
      if (element.lastVerdict === "Pass") {
        regPass++;
      } else {
        regFail++;
      }
    }
    let checkPass = 0;
    let checkFail = 0;
    let fixed = 0;
    let itfail = 0;
    let regression = 0;
    let flaky = 0;
    for (let index = 0; index < tempArray.length; index++) {
      const element = tempArray[index];
      if (element.verdictCheck === "Pass") {
        checkPass++;
      }
      if (element.verdictCheck === "Fail") {
        checkFail++;
      }
      if (element.verdictCheck === "Fixed") {
        fixed++;
      }
      if (element.verdictCheck === "Intermittent Failure") {
        itfail++;
      }
      if (element.verdictCheck === "Regression") {
        regression++;
      }
      if (element.verdictCheck === "Flaky") {
        flaky++;
      }
    }

    let pie = {
      pass: regPass,
      fail: regFail,
    };
    const pieCheck = {
      pass: checkPass,
      fail: checkFail,
      fixed,
      intermittentFailure: itfail,
      regressions: regression,
      flaky: flaky,
    };
    return { pie, pieCheck };
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
  const [FilterType, setFilterType] = useState("filter");
  const [PieType, setPieType] = useState("check");
  return (
    <div className="hidden">
      {fetchedData === false ? (
        <>
          <LoadingAnimation />
          <div className="sec"></div>
        </>
      ) : (
        <div>
          <DashBoard
            testCases={testCases}
            fetchedUpdateData={fetchedUpdateData}
            setResult={setresultData}
          />
          <div className="topLeftArea">
            <div className="icon-container">
              <div>
                <FontAwesomeIcon
                  icon={faFilter}
                  onClick={() => {
                    setFilterType("filter");
                    console.log(FilterType);
                  }}
                  className="filter-icon"
                />
              </div>

              <FontAwesomeIcon
                onClick={() => {
                  setFilterType("pie");
                  console.log(FilterType);
                }}
                icon={faChartPie}
                className="pie-chart-icon"
              />
            </div>
            <div
              className={`${
                FilterType !== "pie"
                  ? "animate__animated animate__backOutLeft"
                  : "animate__animated animate__backInLeft"
              } contentTopLeft`}>
              <div
                className={`${
                  PieType !== "check"
                    ? "animate__animated animate__rotateOut not-there"
                    : "animate__animated animate__rotateIn"
                } contentTopLeft`}>
                <VCheck
                  data={pieData2}
                  setVerdictCheck={filterVerdictCheck}
                  VerdictCheck={VerdictCheck}></VCheck>
              </div>
              <div
                className={`${
                  PieType !== "final"
                    ? "animate__animated animate__rotateOut not-there"
                    : "animate__animated animate__rotateIn"
                } contentTopLeft`}>
                <PieChart
                  data={pieData}
                  Verdict={FilterVerdict}
                  setVerdict={filterVerdict}></PieChart>
              </div>
              <div className="pieTypes">
                <label onClick={() => setPieType("check")}>
                  <input
                    type="checkbox"
                    value="option1"
                    checked={PieType === "check"}
                    onChange={() => setPieType("check")}
                  />
                  Verdict Check
                </label>
                <label onClick={() => setPieType("final")}>
                  <input
                    type="checkbox"
                    value="option2"
                    checked={PieType === "final"}
                    onChange={() => setPieType("final")}
                  />
                  Last Verdict
                </label>
              </div>
            </div>
            <div
              className={`${
                FilterType !== "filter"
                  ? "animate__animated animate__backOutLeft"
                  : "animate__animated animate__backInLeft"
              } contentTopLeft `}>
              <Filter
                Verdict={FilterVerdict}
                setVerdict={filterVerdict}
                setVerdictCheck={filterVerdictCheck}
                VerdictCheck={VerdictCheck}
                Imbalance={Imbalance}
                setImbalance={filterImbalance}></Filter>
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
