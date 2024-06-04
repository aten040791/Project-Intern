module.exports = {
  secret: process.env.JWT_SECRET || "secret",

  //   1h
  ttl: "20s",
};
