import React from "react";

const RowItem = (props: any) => {
  return (
    <div className="row-item">
      <p>{props.testCase.formattedID}</p>
      <p>{props.testCase.name}</p>
      <p>{props.testCase.owner}</p>
      <p>{props.testCase.lastVerdict}</p>
      <p>Working....</p>
      <p>{props.testCase.project}</p>
      <p>{props.testCase.method}</p>
    </div>
  );
};

export default RowItem;
