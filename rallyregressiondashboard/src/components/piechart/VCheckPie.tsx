import React from "react";

const VCheckPie = (props: any) => {
  const data = [
    { label: "Pass", value: props.data.pass, color: "#1a2033" },
    { label: "Fail", value: props.data.fail, color: "#cfa7d1" },
    { label: "Fixed", value: props.data.fixed, color: "#27564f" },
    {
      label: "Intermittent Failure",
      value: props.data.intermittentFailure,
      color: "#f28d7b",
    },
    { label: "Regression", value: props.data.regressions, color: "#1c5b8e" },
    { label: "Flaky", value: props.data.flaky, color: "#511d46" },
  ];

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0;

  const handleClick = (event: any, item: any) => {
    console.log("Clicked:", item.label);
    props.setVerdictCheck(item.label);
    // Perform any action you need here based on the clicked dataset
  };

  return (
    <svg
      className="custom-pie-chart"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg">
      {data.map((item) => {
        const sliceAngle = (item.value / totalValue) * 360;
        const endAngle = startAngle + sliceAngle;
        const largeArcFlag = sliceAngle > 180 ? 1 : 0;

        const startAngleX = 50 + 50 * Math.cos((Math.PI / 180) * startAngle);
        const startAngleY = 50 + 50 * Math.sin((Math.PI / 180) * startAngle);

        const endAngleX = 50 + 50 * Math.cos((Math.PI / 180) * endAngle);
        const endAngleY = 50 + 50 * Math.sin((Math.PI / 180) * endAngle);

        const pathData = `M 50 50 L ${startAngleX} ${startAngleY} A 50 50 0 ${largeArcFlag} 1 ${endAngleX} ${endAngleY} Z`;

        // Calculate label position
        const labelAngle = startAngle + sliceAngle / 2;
        var val = item.label === "Intermittent Failure" ? 49 : 52
        const labelX = 51 + 30 * Math.cos((Math.PI / 180) * labelAngle); // Set a distance from the center
        const labelY = val + 30 * Math.sin((Math.PI / 180) * labelAngle); // Set a distance from the center

        // Calculate rotation angle for the text
        const rotationAngle =
          labelAngle > 90 && labelAngle < 270 ? labelAngle + 180 : labelAngle;

        startAngle += sliceAngle;

        return (
          <g key={item.label}>
            <path
              d={pathData}
              fill={item.color}
              onClick={(event) => handleClick(event, item)}
            />
            {item.value > 0 && (
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                fontSize={item.label === "Intermittent Failure" ? 3.5 : 6}
                fill="#f5f5f5"
                pointerEvents="none" // Prevent text from blocking click events
                transform={`rotate(${rotationAngle}, ${labelX}, ${labelY})`}>
                {item.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default VCheckPie;
