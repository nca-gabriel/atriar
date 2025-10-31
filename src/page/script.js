// --- Data Generation Helper ---

// Generate mock data for sparklines (baseValue +/- fluctuation)
function generateMockSparklineData(baseValue, fluctuation, points = 20) {
  const data = [];
  const labels = [];
  for (let i = 0; i < points; i++) {
    data.push(baseValue + (Math.random() - 0.5) * fluctuation);
    labels.push("");
  }
  return { labels, data };
}

// --- Sparkline Initialization Function ---

function createSparkline(canvasId, data, color) {
  const ctx = document.getElementById(canvasId).getContext("2d");

  // Define specific fill colors with transparency to match the image's gradients
  let fillColor;
  switch (color) {
    case "#6ee67b": // Uptime Green
      fillColor = "rgba(110, 230, 123, 0.15)";
      break;
    case "#ffaa33": // Latency Orange
      fillColor = "rgba(255, 170, 51, 0.15)";
      break;
    case "#ff6e6e": // Error Red
      fillColor = "rgba(255, 110, 110, 0.15)";
      break;
    default:
      fillColor = "rgba(255, 255, 255, 0.1)"; // Fallback
  }

  new Chart(ctx, {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [
        {
          data: data.data,
          borderColor: color,
          backgroundColor: fillColor,
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
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }, // Hide all interaction elements
      },
      scales: {
        y: { display: false }, // Hide Y-axis
        x: { display: false }, // Hide X-axis
      },
      layout: {
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
      },
    },
  });
}

// --- Execution ---

document.addEventListener("DOMContentLoaded", () => {
  // 1. Uptime Sparkline (Matches image's green)
  const uptimeData = generateMockSparklineData(99.8, 0.2);
  createSparkline("uptimeSparkline", uptimeData, "#6ee67b");

  // 2. Latency Sparkline (Matches image's orange)
  const latencyData = generateMockSparklineData(150, 50);
  createSparkline("latencySparkline", latencyData, "#ffaa33");

  // 3. Error Rate Sparkline (Matches image's red)
  const errorRateData = generateMockSparklineData(0.2, 0.2, 30);
  createSparkline("errorRateSparkline", errorRateData, "#ff6e6e");

  // The 4th box (Total Bandwidth) currently has no sparkline in JS as per your request.
});
