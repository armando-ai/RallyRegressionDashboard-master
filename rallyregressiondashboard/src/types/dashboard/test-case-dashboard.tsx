import { Result } from "../rally/results/result";

export type TestCaseDashBoard = {
  formattedID: string | null;

  name: string | null;

  owner: string | null | undefined;

  lastVerdict: string | null;

  project: string | null | undefined;

  method: string | null;
};
