import React, { useState } from 'react'
import { MockRallyApi } from '../rest-service/mock-rally-api'

const DashBoard = () => {
    const [testSetID, setTestSetID] = useState("TS10283")
    const rallyApi = new MockRallyApi();
    const testSetRef = rallyApi.getTestSetRef(testSetID);
    const testCaseRef = rallyApi.getTestCaseRef(testSetRef);
    const testCaseResults = rallyApi.getTestCases(testCaseRef);
    console.log(testCaseResults);

  return (
    <div>DashBoard</div>
  )
}

export default DashBoard