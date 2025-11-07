export async function fetchLogs() {
  try {
    const res = await fetch("/atriar/api/logs");
    if (!res.ok) throw new Error("Failed to fetch logs");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
