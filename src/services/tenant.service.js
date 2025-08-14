const prisma = require("../models/prisma/client");

exports.createTenant = async (name, subdomain) => {
  return await prisma.tenant.create({
    data: { name, subdomain },
  });
};
