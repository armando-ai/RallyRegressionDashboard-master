import { Result } from "./results/result";
import { TestCaseTestResult } from "./test-cases/test-case-test-result";

export type QueryResult = {
  _rallyAPIMajor: string;
  _rallyAPIMinor: string;
  Errors: any[];
  Warnings: any[];
  TotalResultCount: number;
  StartIndex: number;
  PageSize: number;
  Results: Array<Result> | Array<TestCaseTestResult> | any;
};
