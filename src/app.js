const express = require("express");
const tenantMiddleware = require('../src/middleware/tenant');
const cors = require("cors");
const morgan = require("morgan");
const subdomainMiddleware = require("./middleware/subdomain");
const tenantRoutes = require("./routes/tenant.routes");

const app = express();

// Use tenant middleware for all routes that require tenant context
app.use(tenantMiddleware);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Subdomain middleware
app.use(subdomainMiddleware);

// Routes
app.use("/api/tenants", tenantRoutes);

// Fallback
app.get("/", (req, res) => {
  res.send("SaaS Platform API");
});

app.get('/', (req, res) => {
  res.send(`Hello, ${req.tenant.name}! Your subdomain is ${req.tenant.subdomain}`);
});

module.exports = app;
