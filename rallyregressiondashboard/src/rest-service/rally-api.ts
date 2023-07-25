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
  public async getPreviousTestCaseResults(testCaseResultsRef: string) {
    const testCaseQueryResults: any = await Request(testCaseResultsRef, "GET", null)
    return testCaseQueryResults.QueryResult.Results;
  }

  public async getImageRef(attachmentRef: any) {

    const imageQueryResults: any = await Request(attachmentRef, "GET", null);
    let url: string = "";
    if (imageQueryResults.QueryResult.Results) {

      url = imageQueryResults.QueryResult.Results[0]._ref.replace("webservice/v2.0/", "");
      return url;
    }
    return null;

  }

}
export default RallyApi;
