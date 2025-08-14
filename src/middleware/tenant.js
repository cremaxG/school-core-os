// src/middleware/tenant.js

const prisma = require('../models/prisma/client');

async function tenantMiddleware(req, res, next) {
  try {
    const host = req.headers.host; // e.g. college1.example.com:3000
    const hostname = host.split(':')[0]; // remove port if exists
    
    const parts = hostname.split('.');
    if (parts.length < 3) {
      // e.g. example.com (no subdomain)
      return res.status(400).send('Subdomain required');
    }
    
    const subdomain = parts[0]; // college1
    
    // Check if tenant exists
    const tenant = await prisma.tenant.findUnique({
      where: { subdomain }
    });
    
    if (!tenant) {
      return res.status(404).send('Tenant not found');
    }
    
    // Attach tenant info to request object
    req.tenant = tenant;
    next();
  } catch (error) {
    console.error('Tenant middleware error:', error);
    res.status(500).send('Internal server error');
  }
}

module.exports = tenantMiddleware;
