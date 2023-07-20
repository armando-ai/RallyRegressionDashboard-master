import React, { useState } from "react";
import RowItem from "../components/dashboard/row-item";
import { TestCaseDashBoard } from "../types/dashboard/test-case-dashboard";
const DashBoard = (props: any) => {
  const testCases = props.testCases;
  const renderListOfTestCases = () => {
    return testCases.map((testCase: TestCaseDashBoard) => (
      <RowItem setResult={props.setResult} testCase={testCase}></RowItem>
    ));
  };
  return (
    <div className="dashboard">
      <div className="header">
        <h1>ID</h1>
        <h1>NAME</h1>
        <h1>OWNER</h1>
        <h1>LAST VERDICT</h1>

        <h1>PROJECT</h1>
        <h1>METHOD</h1>
        <h1>VERDICT CHECK</h1>
      </div>
    <div className="row-items">
    {renderListOfTestCases()}
    </div>
    
    </div>
  );
};

export default DashBoard;
