import { testCases, testSet, testSetRef } from "../data/mock-data";
import { QueryResult } from "../types/rally/query-result";
import { TestCase } from "../types/rally/test-cases/test-case";
import { TestSet } from "../types/rally/test-set";

export class MockRallyApi {
  public getTestSetRef(testSetID: string): string {
    return testSetRef.Results[0]._ref;
  }
  public getTestCaseRef(testSetRef: string): string {
    return testSet.TestCases._ref;
  }

  public getTestCases(testCaseRef: string): Array<TestCase> {
    return testCases.Results;
  }
}
