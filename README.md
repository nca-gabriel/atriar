---
# **Atriar Request Logger and Dashboard**

A drop-in middleware that **logs all API requests** and **displays them in a built-in visual dashboard**. Zero configuration required.
---

## **✨ Features**

- **Automatic request logging**: method, path, status, duration, timestamp, IP, user agent, size, error
- **Real-time dashboard** served locally
- **Charts**: traffic over time, status distribution
- **Performance insights**: slowest and most error-prone endpoints
- **Search + filters** in the logs table
- **Local-first**: no accounts or cloud needed
- Works in **JavaScript + TypeScript**
- Multiple storage options (SQLite, MongoDB, PostgreSQL)

---

## **📦 Installation**
```bash
npm install atriar
# or
yarn add atriar
```

## **⚙️ Usage**
```typescript
import express from "express";
import { atriar } from "atriar";

const app = express();

// Add Atriar middleware before your routes (url can be client or mongoatlas link)
app.use(atriar({ provider: "mongodb", url: "mongodb://localhost/atriar" }));

// Example routes
app.get("/api/hello", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```
Once started, open your browser at http://localhost:3000/atriar
 to view the dashboard.

## **🧱 Tech Stack**
TypeScript

Express Middleware

Chart.js

Vite (Dashboard UI)

Node.js / npm

## **🧪 Development**
```bash
git clone https://github.com/yourusername/atriar.git
cd atriar
npm install
npm run dev
```




 
