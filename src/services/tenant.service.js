const prisma = require("../models/prisma/client");

exports.createTenant = async (name, subdomain) => {
  return await prisma.tenant.create({
    data: { name, subdomain },
  });
};

exports.registerTenant = async (name, subdomain) => {
  const existingTenant = await prisma.tenant.findUnique({
    where: { subdomain },
  });

  if (existingTenant) {
    throw new Error("Subdomain already exists");
  }

  return await prisma.tenant.create({
    data: { name, subdomain },
  });
};
