import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChartPie } from "@fortawesome/free-solid-svg-icons";

import Filter from "../filter/Filter";
import CustomPieChart from "../piechart/CustomPieChart";
import VCheckPie from "../piechart/VCheckPie";

const FilterArea = (props: any) => {
  return (
    <div className="topLeftArea">
      <div className="icon-container">
        <div>
          <FontAwesomeIcon
            icon={faFilter}
            onClick={() => {
              props.setFilterType("filter");
            }}
            className="filter-icon"
          />
        </div>

        <FontAwesomeIcon
          onClick={() => {
            props.setFilterType("pie");
          }}
          icon={faChartPie}
          className="pie-chart-icon"
        />
      </div>
      <div
        className={`${
          props.FilterType !== "pie"
            ? "animate__animated animate__backOutLeft"
            : "animate__animated animate__backInLeft"
        } contentTopLeft`}>
        <div
          className={`${
            props.PieType !== "check"
              ? "animate__animated animate__rotateOut not-there"
              : "animate__animated animate__rotateIn"
          } contentTopLeft`}>
          <VCheckPie
            data={props.pieData2}
        
          setVerdictCheck={props.setVerdictCheck}
          VerdictCheck={props.VerdictCheck}
            ></VCheckPie>
        </div>
        <div
          className={`${
            props.PieType !== "final"
              ? "animate__animated animate__rotateOut not-there"
              : "animate__animated animate__rotateIn"
          } contentTopLeft`}>
          <CustomPieChart
            data={props.pieData}
            Verdict={props.FilterVerdict}
            setVerdict={props.setVerdict}></CustomPieChart>
        </div>
        <div className="pieTypes">
          <label onClick={() => props.setPieType("check")}>
            <input
              type="checkbox"
              value="option1"
              checked={props.PieType === "check"}
              onChange={() => props.setPieType("check")}
            />
            Verdict Check
          </label>
          <label onClick={() => props.setPieType("final")}>
            <input
              type="checkbox"
              value="option2"
              checked={props.PieType === "final"}
              onChange={() => props.setPieType("final")}
            />
            Last Verdict
          </label>
        </div>

      </div>
      <div
        className={`${
          props.FilterType !== "filter"
            ? "animate__animated animate__backOutLeft"
            : "animate__animated animate__backInLeft"
        } contentTopLeft `}>
        <Filter
          Verdict={props.FilterVerdict}
          setVerdict={props.setVerdict}
          setVerdictCheck={props.setVerdictCheck}
          VerdictCheck={props.VerdictCheck}
          Imbalance={props.Imbalance}
          setImbalance={props.filterImbalance}></Filter>
      </div>
    </div>
  );
};

export default FilterArea;
