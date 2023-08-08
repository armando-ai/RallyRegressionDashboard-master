import { useEffect, useState } from "react";

import "../css/App.css";
import RallyApi from "../rest-service/rally-api";
import { parseTestCase } from "../utils/parser";
import { TestCaseDashBoard } from "../types/dashboard/test-case-dashboard";
import DashBoard from "./DashBoard";
import LastResult from "../components/dashboard/last-resullt";
import Landing from "./Landing";
import FilterArea from "../components/filterArea/FilterArea";
import LoadingAnimation from "../components/LoadingAnimation";

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
  const [selectedTestSet, setSelectedTestSet] = useState("TS51048");

  let testCaseRef: string;
  const onUpdateTestSet = (newValue: any) => {
    setSelectedTestSet(newValue);
    updateTestSet(newValue);
  };

  const updateTestSet = async (newValue: any) => {
    const api = new RallyApi();
    const testSetRef = await api.getTestSetRef(newValue);
    if (testSetRef) {
      setFetchedUpdateData(true);
      testCaseRef = await api.getTestCaseRef(testSetRef);
      const testCases = await api.getTestCases(testCaseRef);
      setImbalanceTestCases(testCases);
      setFlakyFlipsTestCases(testCases);
      const parsedTestCases = await parseTestCase(testCases);
      const { pie, pieCheck } = await createPieData(parsedTestCases);
      setTestCases(parsedTestCases);
      setOriginalTestCases(parsedTestCases);
      setFetchedData(true);
      scrollToBottom();
      setPieData(pie);
      setPieData2(pieCheck);
      setFetchedUpdateData(false);
    } else {
      console.log("bad test set");
    }
  };

  const [pieData, setPieData] = useState<any>("");
  const [pieData2, setPieData2] = useState<any>("");
  const [FilterType, setFilterType] = useState("filter");
  const [PieType, setPieType] = useState("check");
  const fetchData = async () => {
    if (
      !window.location.href
        .toString()
        .includes(`?apiKey=${process.env.REACT_APP_APIKEY}`)
    ) {
      window.location.href =
        window.location.href.toString() +
        `?apiKey=${process.env.REACT_APP_APIKEY}`;
    }
    setFetchedData(true);
    // const api = new RallyApi();
    // const testSetRef = await api.getTestSetRef(selectedTestSet);
    // if (testSetRef) {
    //   testCaseRef = await api.getTestCaseRef(testSetRef);
    //   const testCases = await api.getTestCases(testCaseRef);
    //   setImbalanceTestCases(testCases);
    //   setFlakyFlipsTestCases(testCases);
    //   const parsedTestCases = await parseTestCase(testCases);
    //   const { pie, pieCheck } = await createPieData(parsedTestCases);
    //   setTestCases(parsedTestCases);
    //   setOriginalTestCases(parsedTestCases);

    //   setPieData(pie);
    //   setPieData2(pieCheck);
    // } else {
    //   console.log("bad test set");
    // }
  };
  if (fetchedData === false) {
    fetchData();
  }
  const rawTestCases = originaltestCases;
  const filterFlakyFlips = async (FlakyFlips: string) => {
    setFlakyFlips(FlakyFlips);
    setFetchedUpdateData(true);
    const parsedTestCases = await parseTestCase(
      testCasesFlakyFlips,
      +Imbalance,
      +FlakyFlips
    );
    setTestCases(parsedTestCases);
    setFetchedUpdateData(false);
  };
  const filterImbalance = async (Imbalance: string) => {
    setImbalance(Imbalance);
    setFetchedUpdateData(true);
    const parsedTestCases = await parseTestCase(
      testCasesImbalance,
      +Imbalance,
      +FlakyFlips
    );
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
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.removeEventListener("scroll", onScroll);

    window.addEventListener("scroll", onScroll, { passive: true });
    if (offset) return () => window.removeEventListener("scroll", onScroll);
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
  return (
    <div className={fetchedData === false ? `hidden` : ""}>
      {/* {fetchedData === false ? (
        <>
          <LoadingAnimation />
          <div className="sec"></div>
        </>
      ) : ( */}
      <div className="fill">
        <Landing
        fetchedUpdateData={fetchedUpdateData}
          initialTestSet={selectedTestSet}
          testCases={testCases}
          onUpdateTestSet={onUpdateTestSet} // Pass the function as a prop
        />
        {testCases.length > 0 && (
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
        )}
        {resultData.build !== undefined ? (
          <LastResult result={resultData} />
        ) : (
          testCases.length > 0 && (
            <div className="full">
              <br></br>
            </div>
          )
        )}
      </div>
      {/* )} */}
    </div>
  );
}

export default App;
