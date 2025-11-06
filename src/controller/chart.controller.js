export function generateRpmData() {
  // Labels representing 12 time points (e.g., 12 hours)
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

  // Mock data sets simulating traffic patterns
  const totalRequests = [
    1500, 1800, 2200, 2500, 2900, 3100, 3400, 3000, 2800, 2500, 2000, 1900,
  ];
  // Success is slightly less than total
  const successRequests = totalRequests.map((r) =>
    Math.floor(r * (0.95 + Math.random() * 0.03))
  );
  // Errors are a small fraction of the total
  const errorRequests = totalRequests.map((r) =>
    Math.floor(r * (0.05 - Math.random() * 0.02))
  );
  // Example endpoint traffic
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
