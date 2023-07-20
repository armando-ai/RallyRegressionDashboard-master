import RallyApi from "../rest-service/rally-api";
import { TestCaseDashBoard } from "../types/dashboard/test-case-dashboard";
import { TestCase } from "../types/rally/test-cases/test-case";
import { TestCaseTestResult } from "../types/rally/test-cases/test-case-test-result";

export async function parseTestCase(testCases: Array<TestCase>, imbalance?: number) {
  const parsedTestCases = new Array<TestCaseDashBoard>();
  for (let index = 0; index < testCases.length; index++) {
    const testCase = testCases[index];

    const parsedTestCase: TestCaseDashBoard = {
      name: testCase.Name,
      formattedID: testCase.FormattedID,
      owner: testCase.Owner?._refObjectName,
      lastVerdict: testCase.LastVerdict,
      project: testCase.Project?._refObjectName,
      method: testCase.Method,
      verdictCheck: null,
      lastResultData: null,
    };

    const url =
      "http://localhost:3000/" +
      testCase.Results?._ref.replace(
        "https://rally1.rallydev.com/slm/webservice/v2.0/",
        ""
      );
    const api = new RallyApi();
    const results: Array<TestCaseTestResult> =
      await api.getPreviousTestCaseResults(url);
    const tempResult = results[0];
    const { Build, Date, Verdict, Notes, Attachments } = tempResult;
    //hit attachments ref then get the Results[0]
    let attachmentUrl = null;
    if (Attachments && Attachments?.Count > 0) {
      attachmentUrl = await api.getImageRef("http://localhost:3000/" + Attachments?._ref.replaceAll("https://rally1.rallydev.com/slm/webservice/v2.0", ""))

    }

    const lastResult = {
      build: Build,
      date: Date,
      verdict: Verdict,
      notes: Notes,
      attachments: attachmentUrl
    }

    parsedTestCase.lastResultData = lastResult;
    let pass = 0;
    let fail = 0;
    let imbalanceNumber = imbalance ? imbalance : 3;
    for (let index = 0; index < 10; index++) {
      const element = results[index];
      const lastResult = element.Verdict;

      if (lastResult?.includes("Pass")) {
        pass++;
      }
      if (lastResult?.includes("Fail") || lastResult?.includes("Blocked")) {
        fail++;
      }
    }
    if (
      results[0].Verdict?.includes("Blocked") &&
      results[1].Verdict?.includes("Fail")
    ) {
      parsedTestCase.verdictCheck = "Fail";
    } else {
      if (pass === 10) {
        parsedTestCase.verdictCheck = "Pass";
      } else if (fail === 10) {
        parsedTestCase.verdictCheck = "Fail";
      } else if (results[0].Verdict?.includes("Fail") && pass > 5) {
        parsedTestCase.verdictCheck = "Intermittent Failure";
      } else if (
        results[0].Verdict?.includes("Fail") &&
        results[1].Verdict?.includes("Fail") &&
        pass > imbalanceNumber
      ) {
        parsedTestCase.verdictCheck = "Regression";
      } else if (isFlaky(results)) {
        parsedTestCase.verdictCheck = "Flaky";
      } else if (
        results[0].Verdict?.includes("Passed") &&
        results[1].Verdict?.includes("Fail")
      ) {
        parsedTestCase.verdictCheck = "Fixed";
      } else {
        if (results[0].Verdict?.includes("Pass") && pass >= fail) {
          parsedTestCase.verdictCheck = "Pass";
        } else if (
          results[0].Verdict?.includes("Fail" || "Blocked") &&
          pass <= fail
        ) {
          parsedTestCase.verdictCheck = "Fail";
        }
      }
    }

    parsedTestCases.push(parsedTestCase);
  }
  return parsedTestCases;
}
function isFlaky(results: any) {
  let flips = 0;

  for (let i = 1; i < results.length - 1; i++) {
    if (results[i].Verdict && results[i - 1].Verdict) {
      if (
        results[i].Verdict.includes("Failed") &&
        results[i - 1].Verdict.includes("Passed")
      ) {
        flips += 1;
      } else if (
        results[i].Verdict.includes("Passed") &&
        results[i - 1].Verdict.includes("Failed")
      ) {
        flips += 1;
      }
    }
  }
  if (flips >= 2) {
    return true;
  }

  return false;
}
