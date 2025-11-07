import { fetchLogs } from "./fetchLog.js";
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
  document.getElementById("uptime-value").innerText = kpi.uptime + "%";
  document.getElementById("latency-value").innerText = kpi.avgLatency + "ms";
  document.getElementById("error-value").innerText = kpi.errorRate + "%";

  // Sparklines
  createSparkline(
    "uptimeSparkline",
    getSparklineData(logs, "uptime"),
    "uptime"
  );
  createSparkline(
    "latencySparkline",
    getSparklineData(logs, "latency"),
    "latency"
  );
  createSparkline("errorSparkline", getSparklineData(logs, "error"), "error");

  // Main Charts
  createRpmChart("requestsPerMinuteChart", getRequestPerMinute(logs));

  createStatusChart("errorStatusesChart", getErrorStatuses(logs));

  createFrequentEndpointsChart(
    "frequentEndpointsChart",
    getFrequentEndpointsData(logs)
  );
});
