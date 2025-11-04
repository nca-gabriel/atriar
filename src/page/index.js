import { generateMockSparklineData } from "../controller/kpi.controller.js";

const sparklineColors = {
  uptime: { line: "#6ee67b", fill: "rgba(110, 230, 123, 0.15)" },
  latency: { line: "#ffaa33", fill: "rgba(255, 170, 51, 0.15)" },
  error: { line: "#ff6e6e", fill: "rgba(255, 110, 110,0.15)" },
};

function createSparkline(canvasId, data, color) {
  const context = document.getElementById(canvasId).getContext("2d");

  // color area under the line
  const { line, fill } = sparklineColors[color] || sparklineColors.uptime;

  new Chart(context, {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [
        {
          data: data.data,
          borderColor: line,
          backgroundColor: fill,
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: { y: { display: false }, x: { display: false } },
      layout: { padding: 0 },
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createSparkline(
    "uptimeSparkline",
    generateMockSparklineData(99.8, 0.2),
    "uptime"
  );
  createSparkline(
    "latencySparkline",
    generateMockSparklineData(150, 50),
    "latency"
  );
  createSparkline(
    "errorSparkline",
    generateMockSparklineData(0.2, 0.2, 30),
    "error"
  );
});
