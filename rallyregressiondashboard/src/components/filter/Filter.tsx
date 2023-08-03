import React from "react";

const Filter = (props: any) => {
  return (
    <div className="filter">
      <div className="filterRow">
        <h1>Verdict Check:</h1>
        <select
          value={props.VerdictCheck}
          onChange={(e) => {
            props.setVerdictCheck(e.target.value);
          }}>
          <option value="Select Verdict Check">Select Verdict Check</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
          <option value="Fixed">Fixed</option>
          <option value="Intermittent Failure">Intermittent Failure</option>
          <option value="Regression">Regression</option>
          <option value="Flaky">Flaky</option>
        </select>
      </div>
      <div className="filterRow">
        <h1>Last Verdict:</h1>
        <select
          value={props.Verdict}
          onChange={(e) => {
            props.setVerdict(e.target.value);
          }}>
          <option value="Select Verdict">Select Verdict</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>
      </div>
      <div className="filterRow">
        <h1>Imbalance:</h1>
        <input
          type="text"
          value={props.Imbalance}
          onChange={(e) => {
            props.setImbalance(e.target.value);
          }}
          placeholder="Enter Imbalance"
        />
      </div>
      <div className="filterRow">
        <h1>Flaky Flips:</h1>
        <input type="text" 
        value = {props.FlakyFlips}
        onChange = {(e) => {
          props.setFlakyFlips(e.target.value);
        }}  
        />
        </div>
    </div>
  );
};

export default Filter;
