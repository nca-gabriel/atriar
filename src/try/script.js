// --- Theme Toggle ---
const themeToggleBtn = document.createElement("button");
themeToggleBtn.textContent = "Toggle Light/Dark";
themeToggleBtn.style.marginLeft = "20px";
themeToggleBtn.style.padding = "5px 10px";
document.querySelector(".dashboard-header").appendChild(themeToggleBtn);

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
}

// --- ⚙️ Data Generation Helpers ---
function generateMockSparklineData(baseValue, fluctuation, points = 20) {
  const data = [];
  const labels = [];
  for (let i = 0; i < points; i++) {
    data.push(baseValue + (Math.random() - 0.5) * fluctuation);
    labels.push("");
  }
  return { labels, data };
}

function generateRpmData() {
  const labels = [
    "12AM",
    "1AM",
    "2AM",
    "3AM",
    "4AM",
    "5AM",
    "6AM",
    "7AM",
    "8AM",
    "9AM",
    "10AM",
    "11AM",
  ];
  const totalRequests = [
    1500, 1800, 2200, 2500, 2900, 3100, 3400, 3000, 2800, 2500, 2000, 1900,
  ];
  const successRequests = totalRequests.map((r) =>
    Math.floor(r * (0.95 + Math.random() * 0.03))
  );
  const errorRequests = totalRequests.map((r) =>
    Math.floor(r * (0.05 - Math.random() * 0.02))
  );
  const userEndpoint = [
    500, 600, 750, 850, 950, 1050, 1150, 1000, 900, 800, 650, 600,
  ];
  return {
    labels,
    totalRequests,
    successRequests,
    errorRequests,
    userEndpoint,
  };
}

function generateMockLogData(count = 15) {
  const methods = ["GET", "POST", "PUT", "DELETE"];
  const paths = [
    "/api/v1/users",
    "/api/v1/data",
    "/api/v1/todos",
    "/api/v1/auth",
    "/api/v1/products",
  ];
  const statuses = [200, 201, 400, 401, 404, 500, 503];
  const ipAddresses = ["192.168.1.15", "10.0.0.22", "172.16.5.99"];
  const logs = [];
  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const duration =
      status >= 500
        ? (Math.random() * 500 + 150).toFixed(0)
        : (Math.random() * 100 + 50).toFixed(0);
    logs.push({
      timestamp: new Date(Date.now() - i * 30000).toISOString(),
      method: methods[Math.floor(Math.random() * methods.length)],
      path: paths[Math.floor(Math.random() * paths.length)],
      status: status,
      duration: parseInt(duration),
      ipAddress: ipAddresses[Math.floor(Math.random() * ipAddresses.length)],
    });
  }
  return logs;
}

// --- 📈 Chart Initialization Functions ---
function createSparkline(canvasId, data, color) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  let fillColor =
    color === "6ee67b"
      ? "rgba(110,230,123,0.15)"
      : color === "#ffaa33"
      ? "rgba(255,170,51,0.15)"
      : color === "#ff6e6e"
      ? "rgba(255,110,110,0.15)"
      : "rgba(255,255,255,0.1)";
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
      labels,
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
        legend: {
          display: true,
          position: "top",
          labels: { color: "#a0a0a0", usePointStyle: true },
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
  const ctx = document.getElementById("errorStatusesChart").getContext("2d");
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
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, title: { display: false } },
      scales: {
        x: {
          grid: { color: "rgba(255, 255, 255, 0.1)" },
          ticks: { color: "#a0a0a0", display: false },
        },
        y: { grid: { display: false }, ticks: { color: "#a0a0a0" } },
      },
    },
  });
}

// --- Table Population ---
function populateLogTable() {
  const logs = generateMockLogData(15);
  const tableBody = document.querySelector("#recentRequestsTable tbody");
  tableBody.innerHTML = "";

  logs.forEach((log) => {
    const row = tableBody.insertRow();
    row.insertCell().textContent = new Date(log.timestamp).toLocaleTimeString(
      "en-US",
      { hour12: false }
    );
    const methodCell = row.insertCell();
    methodCell.innerHTML = `<span class="method-badge method-${log.method}">${log.method}</span>`;
    row.insertCell().textContent = log.path;
    const statusCell = row.insertCell();
    const statusGroup = Math.floor(log.status / 100) * 100;
    statusCell.innerHTML = `<span class="status-badge status-${statusGroup}">${log.status}</span>`;
    row.insertCell().textContent = `${log.duration}ms`;
    row.insertCell().textContent = log.ipAddress;
  });
}

// --- Execute ---
document.addEventListener("DOMContentLoaded", () => {
  createSparkline(
    "uptimeSparkline",
    generateMockSparklineData(99.8, 0.2),
    "#6ee67b"
  );
  createSparkline(
    "latencySparkline",
    generateMockSparklineData(150, 50),
    "#ffaa33"
  );
  createSparkline(
    "errorRateSparkline",
    generateMockSparklineData(0.2, 0.2, 30),
    "#ff6e6e"
  );

  initRequestsPerMinuteChart();
  initErrorStatusesChart();
  initFrequentEndpointsChart();
  populateLogTable();
});
