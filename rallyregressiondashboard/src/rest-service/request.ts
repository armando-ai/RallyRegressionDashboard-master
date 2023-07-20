export const Request = async <T>(
  url: string,
  requestType: string,
  data?: any
) => {
  const header = {
    ZSESSIONID: "_mBjQTpeTSKmDxHFHT8r2eelqB6MMOkiLgXSSeac5fY",
    WorkspaceId: "90129908344",
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: requestType.toUpperCase(),
    headers: header,

    body: data ? JSON.stringify(data) : null,
  });

  return await (<T>response.json());
};
export default Request;
