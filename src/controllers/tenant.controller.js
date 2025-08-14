const tenantService = require("../services/tenant.service");

exports.createTenant = async (req, res) => {
  try {
    const { name, subdomain } = req.body;
    const tenant = await tenantService.createTenant(name, subdomain);
    res.status(201).json(tenant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
