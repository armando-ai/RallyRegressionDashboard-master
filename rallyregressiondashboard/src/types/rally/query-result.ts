import { Result } from "./results/result";

export type QueryResult = {
  _rallyAPIMajor: string;
  _rallyAPIMinor: string;
  Errors: any[];
  Warnings: any[];
  TotalResultCount: number;
  StartIndex: number;
  PageSize: number;
  Results: Array<Result>;
};
