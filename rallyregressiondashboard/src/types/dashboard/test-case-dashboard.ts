import { Result } from "../rally/results/result";
import { LastResultData } from "./last-result-data";

export type TestCaseDashBoard = {
  formattedID: string | null;

  name: string | null;

  owner: string | null | undefined;

  lastVerdict: string | null;

  project: string | null | undefined;

  method: string | null;
  verdictCheck: string | null;
  lastResultData: LastResultData | null;
};
