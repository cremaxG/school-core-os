module.exports = (req, res, next) => {
  const host = req.headers.host;
  const subdomain = host.split('.')[0]; // subdomain.yourdomain.com

  if (subdomain && subdomain !== "www") {
    req.subdomain = subdomain;
  }

  next();
};
