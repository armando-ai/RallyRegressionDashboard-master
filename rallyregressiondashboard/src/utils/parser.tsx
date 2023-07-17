import { TestCaseDashBoard } from "../types/dashboard/test-case-dashboard";
import { TestCase } from "../types/rally/test-cases/test-case";

export function parseTestCase(testCases: Array<TestCase>) {
  const parsedTestCases = new Array<TestCaseDashBoard>();
  testCases.forEach((testCase) => {
    const parsedTestCase: TestCaseDashBoard = {
      name: testCase.Name,
      formattedID: testCase.FormattedID,
      owner: testCase.Owner?._refObjectName,
      lastVerdict: testCase.LastVerdict,
      project: testCase.Project?._refObjectName,
      method: testCase.Method,
    };
    parsedTestCases.push(parsedTestCase);
  });
  return parsedTestCases;
}
