import { COLORS, FILLS, THEME } from "../config/globalColors.js";

export function createSparkline(canvasId, data, type) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const line = COLORS[type] || COLORS.primary;
  const fill = FILLS[type] || FILLS.primary;

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

  const isDark = document.body.classList.contains("dark-mode");
  const theme = isDark ? THEME.dark : THEME.light;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "Total Requests",
          data: data.totalRequests,
          borderColor: COLORS.primary,
          backgroundColor: "transparent",
          tension: 0.4,
          pointRadius: 4,
          borderWidth: 2,
          pointBackgroundColor: COLORS.primary,
        },
        {
          label: "Success (2xx)",
          data: data.successRequests,
          borderColor: COLORS.success,
          backgroundColor: "transparent",
          tension: 0.4,
          pointRadius: 4,
          borderWidth: 2,
          pointBackgroundColor: COLORS.success,
        },
        {
          label: "Errors (4xx/5xx)",
          data: data.errorRequests,
          borderColor: COLORS.danger,
          backgroundColor: "transparent",
          tension: 0.4,
          pointRadius: 4,
          borderWidth: 2,
          pointBackgroundColor: COLORS.danger,
        },
        {
          label: "Endpoint: Users",
          data: data.userEndpoint,
          borderColor: COLORS.accent,
          backgroundColor: "transparent",
          tension: 0.4,
          pointRadius: 4,
          borderWidth: 2,
          pointBackgroundColor: COLORS.accent,
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
          labels: { color: theme.text, usePointStyle: true },
        },
        tooltip: { enabled: true },
      },
      scales: {
        x: {
          ticks: { color: theme.text },
          grid: { display: theme.grid },
        },
        y: {
          beginAtZero: true,
          ticks: { color: theme.text },
          grid: { display: theme.grid },
        },
      },
    },
  });
}

export function createStatusChart(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const isDark = document.body.classList.contains("dark-mode");
  const theme = isDark ? THEME.dark : THEME.light;

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
          backgroundColor: [
            COLORS.success, // 2xx
            COLORS.primary, // 3xx
            COLORS.warning, // 4xx
            COLORS.danger, // 5xx
          ],
          borderColor: theme.border,
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
          labels: { color: theme.text, boxWidth: 10, padding: 8 },
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

  const isDark = document.body.classList.contains("dark-mode");
  const theme = isDark ? THEME.dark : THEME.light;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "Requests Count",
          data: data.data,
          backgroundColor: [
            COLORS.primary,
            COLORS.accent,
            COLORS.success,
            COLORS.warning,
            COLORS.danger,
          ],
          borderColor: theme.border,
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
          grid: { color: theme.grid },
          ticks: { color: theme.text, display: true },
        },
        y: {
          grid: { display: false },
          ticks: { color: theme.text },
        },
      },
    },
  });
}
