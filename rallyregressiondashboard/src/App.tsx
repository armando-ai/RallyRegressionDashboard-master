import React, { useEffect, useState } from "react";

import "./App.css";
import RallyApi from "./rest-service/rally-api";
import { parseTestCase } from "./utils/parser";
import { TestCase } from "./types/rally/test-cases/test-case";
import { TestCaseDashBoard } from "./types/dashboard/test-case-dashboard";
import LoadingAnimation from "./components/LoadingAnimation";
import DashBoard from "./pages/DashBoard";
import LastResult from "./components/dashboard/last-resullt";

import Landing from "./pages/Landing";
import FilterArea from "./components/filterArea/FilterArea";

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
  const [FlakyFlips, setFlakyFlips] = useState("");
  const [testCasesFlakyFlips, setFlakyFlipsTestCases] = useState([]);
  const [fetchedUpdateData, setFetchedUpdateData] = useState<boolean>(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState("");
  const fetchData = async () => {
    let testCaseRef: string;

    if (
      !window.location.href.toString().includes(`?apiKey=${process.env.REACT_APP_APIKEY}`)
    ) {
      window.location.href =
        window.location.href.toString() + `?apiKey=${process.env.REACT_APP_APIKEY}`;
     
    }
    const api = new RallyApi();
    const testSetRef = await api.getTestSetRef("TS51048");
    if (testSetRef) {
      testCaseRef = await api.getTestCaseRef(testSetRef);
      const testCases = await api.getTestCases(testCaseRef);
      setImbalanceTestCases(testCases);
      setFlakyFlipsTestCases(testCases);
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
  const filterFlakyFlips = async (FlakyFlips : string) => {
    setFlakyFlips(FlakyFlips);
    setFetchedUpdateData(true);
    const parsedTestCases = await parseTestCase(testCasesFlakyFlips, +Imbalance,  +FlakyFlips);
    setTestCases(parsedTestCases);
    setFetchedUpdateData(false);
  }
  const filterImbalance = async (Imbalance: string) => {
    setImbalance(Imbalance);
    setFetchedUpdateData(true);
    const parsedTestCases = await parseTestCase(testCasesImbalance, +Imbalance, +FlakyFlips);
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
    <div className={fetchedData === false ? `hidden` : ""}>
      {fetchedData === false ? (
        <>
          <LoadingAnimation />
          <div className="sec"></div>
        </>
      ) : (
        <div className="fill">
          <Landing />
          <div className="dashboard-area">
            <DashBoard
              testCases={testCases}
              fetchedUpdateData={fetchedUpdateData}
              setResult={setresultData}
            />
            <FilterArea
              setFilterType={setFilterType}
              FilterType={FilterType}
              PieType={PieType}
              pieData={pieData}
              setVerdict={filterVerdict}
              setVerdictCheck={filterVerdictCheck}
              pieData2={pieData2}
              setPieType={setPieType}
              FilterVerdict={FilterVerdict}
              filterImbalance={filterImbalance}
              VerdictCheck={VerdictCheck}
              filterFlakyFlips={filterFlakyFlips}></FilterArea>
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
