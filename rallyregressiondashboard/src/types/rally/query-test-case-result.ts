import { TestCase } from "./test-cases/test-case";

export type QueryTestCaseResults = {
  _rallyAPIMajor: string;
  _rallyAPIMinor: string;
  Errors: any[];
  Warnings: any[];
  TotalResultCount: number;
  StartIndex: number;
  PageSize: number;
  Results: Array<TestCase>;
};
