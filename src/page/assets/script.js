import { fetchLogs } from "./fetchLog.js";
import { COLORS } from "../config/globalColors.js";

import {
  calculateKPI,
  getSparklineData,
  getRequestPerMinute,
  getErrorStatuses,
  getFrequentEndpointsData,
} from "./dataTransformation.js";
import {
  createSparkline,
  createRpmChart,
  createStatusChart,
  createFrequentEndpointsChart,
} from "./chartCreate.js";

document.addEventListener("DOMContentLoaded", async () => {
  const logs = await fetchLogs();
  const kpi = calculateKPI(logs);

  const uptime = document.getElementById("uptime-value");
  uptime.innerText = kpi.uptime + "%";
  uptime.style.color = COLORS.success;

  const latency = document.getElementById("latency-value");
  latency.innerText = kpi.avgLatency + "ms";
  latency.style.color = COLORS.danger;

  const error = document.getElementById("error-value");
  error.innerText = kpi.errorRate + "%";
  error.style.color = COLORS.accent;

  // Sparklines
  createSparkline(
    "uptimeSparkline",
    getSparklineData(logs, "uptime"),
    "success"
  );
  createSparkline(
    "latencySparkline",
    getSparklineData(logs, "latency"),
    "danger"
  );
  createSparkline("errorSparkline", getSparklineData(logs, "error"), "accent");

  // Main Charts
  createRpmChart("requestsPerMinuteChart", getRequestPerMinute(logs));

  createStatusChart("errorStatusesChart", getErrorStatuses(logs));

  createFrequentEndpointsChart(
    "frequentEndpointsChart",
    getFrequentEndpointsData(logs)
  );
});

const toggleBtn = document.getElementById("theme-toggle");
const logoImg = document.querySelector(".logo-container img");
const body = document.body;

function updateTheme(isDark) {
  // Toggle class based on the parameter
  body.classList.toggle("dark-mode", isDark);

  // Use the correct variable
  toggleBtn.textContent = isDark ? "☀️" : "🌙";
  logoImg.src = isDark
    ? "./assets/img/logo.png"
    : "./assets/img/logo-white.png";

  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Refresh chart if it exists
  if (window.myRpmChart) {
    window.myRpmChart.destroy();
    createRpmChart("rpmCanvas", yourData);
  }
}

// Load saved theme
const savedTheme = localStorage.getItem("theme") === "dark";
updateTheme(savedTheme);

// Toggle button click
toggleBtn.addEventListener("click", () => {
  updateTheme(!body.classList.contains("dark-mode"));
});
