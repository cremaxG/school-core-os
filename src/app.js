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

const Tenant = require('./models/tenant');

app.use(async (req, res, next) => {
  const host = req.headers.host;
  const subdomain = host.split('.')[0];

  const tenant = await Tenant.findOne({ subdomain });

  if (!tenant) {
    return res.status(403).json({ error: "Subdomain not recognized" });
  }

  req.tenant = tenant;
  next();
});



app.get('/', (req, res) => {
  res.send(`Hello, ${req.tenant.name}! Your subdomain is ${req.tenant.subdomain}`);
});

module.exports = app;
