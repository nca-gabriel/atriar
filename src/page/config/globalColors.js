export const COLORS = {
  primary: "#3b82f6", // blue-500 – main accent
  success: "#10b981", // green-500 – positive KPI
  warning: "#f59e0b", // amber-500 – attention
  danger: "#ef4444", // red-500 – negative KPI
  accent: "#8b5cf6", // purple-500 – optional secondary
  neutral: "#6b7280", // gray-500 – text, labels
};

export const FILLS = {
  primary: "rgba(59, 130, 246, 0.15)",
  success: "rgba(16, 185, 129, 0.15)",
  warning: "rgba(245, 158, 11, 0.15)",
  danger: "rgba(239, 68, 68, 0.15)",
  accent: "rgba(139, 92, 246, 0.15)",
  neutral: "rgba(107, 114, 128, 0.15)",
};

// Optional: Text and grid colors that adapt to mode
export const THEME = {
  light: {
    text: "#888888", // gray-700 – readable
    grid: "rgba(0, 0, 0, 0.05)",
    border: "transparent",
    background: "#f9fafb", // slightly off-white
  },
  dark: {
    text: "#b6b5b5ff", // gray-300 – readable on dark
    grid: "rgba(255, 255, 255, 0.2)",
    border: "#1f2937",
    background: "#0d0d0d",
  },
};
