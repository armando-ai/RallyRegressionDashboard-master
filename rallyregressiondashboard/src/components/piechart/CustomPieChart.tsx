import React from "react";

const CustomPieChart = (props:any) => {
  const data = [
    { label: "Data A", value: 2, color: "#ccc" },
    { label: "Data B", value: 4, color: "#dbdbdb" },
  ];

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0;

  const handleClick = (event: any, item: any) => {
    console.log("Clicked:", item.label);
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

        startAngle += sliceAngle;

        return (
          <path
            key={item.label}
            d={pathData}
            fill={item.color}
            onClick={(event) => handleClick(event, item)}
          />
        );
      })}
    </svg>
  );
};

export default CustomPieChart;
