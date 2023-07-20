import React from "react";

const RowItem = (props: any) => {
  let result = props.testCase.lastResultData;
  result.verdictCheck = props.testCase.verdictCheck;
  return (
    <div
      className="row-item"
      onClick={() => {
        props.setResult(result);
      }}>
      <p>{props.testCase.formattedID}</p>
      <p>{props.testCase.name}</p>
      <p>{props.testCase.owner}</p>
      <p>{props.testCase.lastVerdict}</p>
      <p>{props.testCase.project}</p>
      <p>{props.testCase.method}</p>
      <p>{props.testCase.verdictCheck}</p>
    </div>
  );
};

export default RowItem;
