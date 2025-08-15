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

exports.registerTenant = async (req, res) => {
  console.log("Request body:", req.body);
  const { name, subdomain } = req.body;

  if (!name || !subdomain) {
    return res.status(400).json({ error: "Name and subdomain are required" });
  }

  try {
    const tenant = await tenantService.registerTenant(name, subdomain);
    res.status(201).json({
      message: "Tenant registered successfully",
      tenant,
    });
  } catch (err) {
    if (err.message === "Subdomain already exists") {
      return res.status(409).json({ message: err.message });
    }

    console.error("Registration error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
