import { generateMockSparklineData } from "../controller/kpi.controller.js";
import { generateRpmData } from "../controller/chart.controller.js";

const sparklineColors = {
  uptime: { line: "#6ee67b", fill: "rgba(110, 230, 123, 0.15)" },
  latency: { line: "#ffaa33", fill: "rgba(255, 170, 51, 0.15)" },
  error: { line: "#ff6e6e", fill: "rgba(255, 110, 110,0.15)" },
};

function fixCanvasResolution(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  return ctx;
}

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

function initRequestsPerMinuteChart() {
  const {
    labels,
    totalRequests,
    successRequests,
    errorRequests,
    userEndpoint,
  } = generateRpmData();
  const ctx = document
    .getElementById("requestsPerMinuteChart")
    .getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Total Requests",
          data: totalRequests,
          borderColor: "#03dac6",
          backgroundColor: "transparent",
          tension: 0.4,
          pointRadius: 4,
          borderWidth: 2,
          pointBackgroundColor: "#03dac6",
        },
        {
          label: "Success (2xx)",
          data: successRequests,
          borderColor: "#6ee67b",
          backgroundColor: "transparent",
          tension: 0.4,
          pointRadius: 4,
          borderWidth: 2,
          pointBackgroundColor: "#6ee67b",
        },
        {
          label: "Errors (4xx/5xx)",
          data: errorRequests,
          borderColor: "#ff6e6e",
          backgroundColor: "transparent",
          tension: 0.4,
          pointRadius: 4,
          borderWidth: 2,
          pointBackgroundColor: "#ff6e6e",
        },
        {
          label: "Endpoint: Users",
          data: userEndpoint,
          borderColor: "#c084fc",
          backgroundColor: "transparent",
          tension: 0.4,
          pointRadius: 4,
          borderWidth: 2,
          pointBackgroundColor: "#c084fc",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        zoom: {
          pan: { enabled: true, mode: "x" },
          zoom: {
            wheel: { enabled: true },
            pinch: { enabled: true },
            mode: "x",
          },
        },
        legend: {
          display: true,
          position: "top",
          labels: {
            color: "#a0a0a0",
            usePointStyle: true,
          },
        },
        title: { display: false },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: false },
          grid: { color: "rgba(255, 255, 255, 0.1)" },
          ticks: { color: "#a0a0a0" },
        },
        x: {
          title: { display: false },
          grid: { color: "rgba(255, 255, 255, 0.1)" },
          ticks: { color: "#a0a0a0" },
        },
      },
    },
  });
}

function initErrorStatusesChart() {
  const canvas = document.getElementById("errorStatusesChart");
  const ctx = fixCanvasResolution(canvas);

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: [
        "2xx Success",
        "3xx Redirect",
        "4xx Client Error",
        "5xx Server Error",
      ],
      datasets: [
        {
          label: "Request Status Distribution",
          data: [8500, 500, 750, 250],
          backgroundColor: [
            "#6ee67b", // Green for 2xx
            "#42a5f5", // Blue for 3xx
            "#ffaa33", // Orange for 4xx
            "#ff6e6e", // Red for 5xx
          ],
          borderColor: "#1a1a1a",
          borderWidth: 2,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: {
        legend: {
          position: "right",
          labels: {
            color: "#a0a0a0",
            boxWidth: 10,
            padding: 8,
          },
        },
        title: { display: false },
      },
    },
  });
}

function initFrequentEndpointsChart() {
  const ctx = document
    .getElementById("frequentEndpointsChart")
    .getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["/api/users", "/api/data", "/api/todos", "/api/auth"],
      datasets: [
        {
          label: "Requests Count",
          data: [3500, 2100, 1500, 900],
          backgroundColor: ["#03dac6", "#42a5f5", "#c084fc", "#6ee67b"],
          borderColor: "#1a1a1a",
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y", // Makes it horizontal
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: false },
      },
      scales: {
        x: {
          grid: { color: "rgba(255, 255, 255, 0.1)" },
          ticks: { color: "#a0a0a0", display: false },
        },
        y: {
          grid: { display: false },
          ticks: { color: "#a0a0a0" },
        },
      },
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

  initErrorStatusesChart();
  initFrequentEndpointsChart();
  initRequestsPerMinuteChart();
});
