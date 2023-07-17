import { QueryResult } from "../types/rally/query-result";
import { QueryTestCaseResults } from "../types/rally/query-test-case-result";
import { TestCase } from "../types/rally/test-cases/test-case";
import { TestSet } from "../types/rally/test-set";
import Request from "./request";

export class RallyApi {
  public async getTestSetRef(testSetID: string) {
    const testSetQuery: QueryResult = await Request(
      "http://localhost:3000/testset?query=(FormattedID = " +
      testSetID +
      ")",
      "GET",
      null
    );
    console.log(testSetQuery);
    return testSetQuery;
  }
  public async getTestSet(testSetRef: string) {
    const testSet: TestSet = await Request(testSetRef, "GET", null);
    return testSet;
  }

  public async getTestCases(testCaseRef: string) {
    const testCaseQuery: QueryTestCaseResults = await Request(
      testCaseRef,
      "GET",
      null
    );
    return testCaseQuery.Results;
  }
}
export default RallyApi;
