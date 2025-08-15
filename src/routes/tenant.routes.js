const express = require("express");
const router = express.Router();
const tenantController = require("../controllers/tenant.controller");

// Register new tenant
router.post("/register", tenantController.registerTenant);

// Existing route
router.post("/", tenantController.createTenant);

module.exports = router;
