import React from "react";

const CustomPieChart = (props: any) => {
  const data = [
    { label: "Pass", value: props.data.pass, color: "#00ff00" },
    { label: "Fail", value: props.data.fail, color: "#FF0000" },
  ];

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0;

  const handleClick = (event: any, item: any) => {
    console.log("Clicked:", item.label);
    props.setVerdict(item.label);
    // Perform any action you need here based on the clicked dataset
  };

  return (
    <svg
      className="custom-pie-chart"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
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
        const labelX = 50 + 35 * Math.cos((Math.PI / 180) * labelAngle);
        const labelY = 50 + 35 * Math.sin((Math.PI / 180) * labelAngle);

        startAngle += sliceAngle;

        return (
          <g key={item.label}>
            <path
              d={pathData}
              fill={item.color}
              onClick={(event) => handleClick(event, item)}
            />
            {/* Add text label */}
            <text
              x={labelX}
              y={labelY}
              textAnchor="middle"
              fontSize="8"
              fill="#000000"
              pointerEvents="none" // Prevent text from blocking click events
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default CustomPieChart;
