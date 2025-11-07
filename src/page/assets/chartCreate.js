import { sparklineColors } from "../config/sparkLineColors.js";

export function createSparkline(canvasId, data, type) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const { line, fill } = sparklineColors[type];

  new Chart(ctx, {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [
        {
          data: data.data,
          borderColor: line,
          backgroundColor: fill,
          fill: true,
          borderWidth: 1,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: { x: { display: false }, y: { display: false } },
    },
  });
}

export function createRpmChart(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "Total Requests",
          data: data.totalRequests,
          borderColor: "#03dac6",
          backgroundColor: "transparent",
          tension: 0.4,
          pointRadius: 4,
          borderWidth: 2,
          pointBackgroundColor: "#03dac6",
        },
        {
          label: "Success (2xx)",
          data: data.successRequests,
          borderColor: "#6ee67b",
          backgroundColor: "transparent",
          tension: 0.4,
          pointRadius: 4,
          borderWidth: 2,
          pointBackgroundColor: "#6ee67b",
        },
        {
          label: "Errors (4xx/5xx)",
          data: data.errorRequests,
          borderColor: "#ff6e6e",
          backgroundColor: "transparent",
          tension: 0.4,
          pointRadius: 4,
          borderWidth: 2,
          pointBackgroundColor: "#ff6e6e",
        },
        {
          label: "Endpoint: Users",
          data: data.userEndpoint,
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
        legend: {
          display: true, // ✅ legend is explicitly enabled
          position: "bottom",
          labels: { color: "#a0a0a0", usePointStyle: true },
        },
        tooltip: { enabled: true },
      },
      scales: {
        x: {
          ticks: { color: "#a0a0a0" },
          grid: { display: false },
        },
        y: {
          beginAtZero: true,
          ticks: { color: "#a0a0a0" },
          grid: { color: "rgba(255,255,255,0.1)" },
        },
      },
    },
  });
}

export function createStatusChart(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

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
          data: [
            data["2xx"] || 0,
            data["3xx"] || 0,
            data["4xx"] || 0,
            data["5xx"] || 0,
          ],
          backgroundColor: ["#6ee67b", "#42a5f5", "#ffaa33", "#ff6e6e"],
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
          labels: { color: "#a0a0a0", boxWidth: 10, padding: 8 },
        },
        tooltip: { enabled: true },
      },
    },
  });
}

export function createFrequentEndpointsChart(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "Requests Count",
          data: data.data,
          backgroundColor: [
            "#03dac6",
            "#42a5f5",
            "#c084fc",
            "#6ee67b",
            "#ff6e6e",
          ],
          borderColor: "#1a1a1a",
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y", // horizontal bars
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: false },
      },
      scales: {
        x: {
          grid: { color: "rgba(255, 255, 255, 0.1)" },
          ticks: { color: "#a0a0a0", display: true },
        },
        y: {
          grid: { display: false },
          ticks: { color: "#a0a0a0" },
        },
      },
    },
  });
}
