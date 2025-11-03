export function generateMockSparklineData(baseValue, fluctuation, points = 20) {
  const data = [];
  const labels = [];
  for (let i = 0; i < points; i++) {
    data.push(baseValue + (Math.random() - 0.5) * fluctuation);
    labels.push("");
  }
  return { labels, data };
}
    