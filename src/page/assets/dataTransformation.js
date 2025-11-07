export function calculateKPI(logs) {
  const total = logs.length;
  const errorCount = logs.filter((l) => l.status >= 400).length;
  const uptime = total
    ? (((total - errorCount) / total) * 100).toFixed(1)
    : 100;
  const avgLatency = total
    ? (
        logs.reduce((sum, l) => sum + Number(l.duration || 0), 0) / total
      ).toFixed(0)
    : 0;
  const errorRate = total ? ((errorCount / total) * 100).toFixed(1) : 0;

  return { uptime, avgLatency, errorRate };
}

export function getSparklineData(logs, key) {
  const grouped = { labels: [], data: [] };

  logs.forEach((log, i) => {
    grouped.labels.push(i + 1);
    if (key === "latency") grouped.data.push(log.duration || 0);
    if (key === "error") grouped.data.push(log.status >= 400 ? 1 : 0);
    if (key === "uptime") grouped.data.push(log.status < 500 ? 1 : 0);
  });
  // 1 = worked, 0 = not
  return grouped;
}

export function getRequestPerMinute(logs) {
  const totalRequests = {};
  const successRequests = {};
  const errorRequests = {};
  const userEndpoint = {};

  const date = new Date();

  logs.forEach((log) => {
    date.setTime(new Date(log.timestamp));
    const key = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    totalRequests[key] = (totalRequests[key] || 0) + 1;
    if (log.status >= 200 && log.status < 300)
      successRequests[key] = (successRequests[key] || 0) + 1;
    if (log.status >= 400) errorRequests[key] = (errorRequests[key] || 0) + 1;
    if (log.path.startsWith("/api/users"))
      userEndpoint[key] = (userEndpoint[key] || 0) + 1;
  });

  const labels = Object.keys(totalRequests).sort();

  return {
    labels,
    totalRequests: labels.map((l) => totalRequests[l] || 0),
    successRequests: labels.map((l) => successRequests[l] || 0),
    errorRequests: labels.map((l) => errorRequests[l] || 0),
    userEndpoint: labels.map((l) => userEndpoint[l] || 0),
  };
}

export function getErrorStatuses(logs) {
  const statusCounts = { "2xx": 0, "3xx": 0, "4xx": 0, "5xx": 0 };

  logs.forEach((log) => {
    const status = log.status;
    if (status >= 200 && status < 300) statusCounts["2xx"]++;
    else if (status >= 300 && status < 400) statusCounts["3xx"]++;
    else if (status >= 400 && status < 500) statusCounts["4xx"]++;
    else if (status >= 500) statusCounts["5xx"]++;
  });

  return statusCounts;
}

export function getFrequentEndpointsData(logs) {
  const endpointCounts = {};
  logs.forEach((log) => {
    endpointCounts[log.path] = (endpointCounts[log.path] || 0) + 1;
  });
  const labels = Object.keys(endpointCounts).slice(0, 5); // top 5 endpoints
  const data = labels.map((l) => endpointCounts[l]);
  return { labels, data };
}
