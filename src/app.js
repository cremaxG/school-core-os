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

const prisma = require('./models/prisma/client');

app.use(async (req, res, next) => {
  // Allow access to public routes like /api/tenants/register
  if (req.path === '/api/tenants/register') return next();

  const host = req.headers.host;
  const subdomain = host.split('.')[0];

  try {
    const tenant = await prisma.tenant.findUnique({
      where: { subdomain },
    });

    if (!tenant) {
      return res.status(403).json({ error: "Subdomain not recognized" });
    }

    req.tenant = tenant;
    next();
  } catch (err) {
    console.error('Middleware error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});



app.get('/', (req, res) => {
  res.send(`Hello, ${req.tenant.name}! Your subdomain is ${req.tenant.subdomain}`);
});

module.exports = app;
