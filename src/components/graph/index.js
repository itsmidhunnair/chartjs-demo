import { useState } from "react";
import { Chart as ChartJs } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";

/**
 * Graph Built using Chart.js
 *
 * Will generate graph based on date and body weight.
 *
 * targetWeight can be provided so that a highlight based
 * on target weight can be displayed on the graph.
 */
const Graph = () => {
  const [targetWeight, setTargetWeight] = useState(70);

  const bmiData = [
    { date: "2023-01-01", weight: 100 },
    { date: "2023-01-25", weight: 88 },
    { date: "2023-03-15", weight: 80 },
    { date: "2023-05-29", weight: 85 },
    { date: "2023-07-05", weight: 78 },
    { date: "2023-09-20", weight: 80 },
    { date: "2023-11-22", weight: 75 },
  ];

  const primaryColor = "#5b21b6";
  const primaryLowFade = "#5b21b61A";

  return (
    <>
      <div style={{ maxHeight: "400px" }}>
        <Line
          // ref={(reference) => (reference )}
          data={{
            labels: bmiData.map((data) => data.date),
            datasets: [
              {
                label: "BMI",
                data: bmiData.map((data) => data.weight),
                borderWidth: 1,
                fill: false,
                segment: { borderDash: [5, 3], borderColor: primaryColor },
                borderColor: primaryColor,
                pointStyle: "circle",
                pointBackgroundColor: primaryColor,
                pointRadius: (ctx, option) => {
                  return ctx.dataIndex === 0 ? 0 : 5;
                },
                pointBorderColor: primaryColor,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              demo: {
                test: 0.5,
              },
            },
            scales: {
              x: {
                border: {
                  display: true,
                },
                grid: {
                  display: false,
                  drawOnChartArea: true,
                  drawTicks: true,
                },
                type: "time",
                time: {
                  unit: "month",
                  displayFormats: {
                    month: "MMMM",
                  },
                },
                ticks: {
                  align: "start",
                },
                min: "01-01-2023",
              },
              y: {
                labels: [50, 70, 90, 110],
                border: {
                  display: true,
                },
                min: 50,
                max: 110,
                // ticks: {
                //   stepSize: 10,
                // },
                ticks: {
                  callback: function (val, index) {
                    // Hide every 2nd tick label
                    return index % 2 === 0 ? this.getLabelForValue(val) : "";
                  },
                },
                grid: {
                  tickLength: 15,
                  color: function (context) {
                    if (context.tick.value === targetWeight) {
                      return primaryColor;
                    }
                    if (
                      context.tick.value > targetWeight &&
                      context.tick.value % 2 === 0
                    ) {
                      return "#d7d7d7";
                    }
                  },
                },
              },
            },
          }}
          plugins={[
            {
              beforeDatasetDraw: (chart, args, pluginOptions) => {
                const {
                  ctx,
                  chartArea: { bottom, height, left, right, top, width },
                  scales: { x, y },
                } = chart;
                console.log(
                  "🚀 ~ file: index.js:114 ~ Graph ~ height:",
                  height
                );
                ctx.fillStyle = primaryLowFade;
                ctx.fillRect(
                  left,
                  y.getPixelForValue(targetWeight) - 50,
                  width,
                  100
                );
              },
            },
          ]}
        />
      </div>
    </>
  );
};

export default Graph;
