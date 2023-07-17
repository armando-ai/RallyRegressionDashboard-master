import { QueryResult } from "../types/rally/query-result";
import { QueryTestCaseResults } from "../types/rally/query-test-case-result";
import { TestCase } from "../types/rally/test-cases/test-case";
import { TestSet } from "../types/rally/test-set";
import Request from "./request";

export class RallyApi {
  public async getTestSetRef(testSetID: string) {
    const response: any = await Request(
      "http://localhost:3000/testset?query=(FormattedID = " +
      testSetID +
      ")",
      "GET",
      null
    )
    console.log(response.QueryResult);
    return await "http://localhost:3000/" + response.QueryResult.Results[0]._ref.replace("https://rally1.rallydev.com/slm/webservice/v2.0/", "");
  }
  public async getTestCaseRef(testSetRef: string) {
    const testSet: any = await Request(testSetRef, "GET", null);
    return "http://localhost:3000/" + testSet.TestSet.TestCases._ref.replace("https://rally1.rallydev.com/slm/webservice/v2.0/", "");
  }

  public async getTestCases(testCaseRef: string) {
    const testCaseQuery: any = await Request(
      testCaseRef,
      "GET",
      null
    );

    return testCaseQuery.QueryResult.Results;
  }
}
export default RallyApi;
