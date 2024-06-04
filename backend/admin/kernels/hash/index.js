const bcryptjs = require("bcryptjs");

module.exports = {
  hash: async (password, salt) => {
    try {
      const genSalt = await bcryptjs.genSalt(salt);
      const hash = await bcryptjs.hash(password, genSalt);
      return hash;
    } catch (error) {
      throw new Error(error);
    }
  },
  compare: async (pw, hash) => {
    const result = await bcryptjs.compare(pw, hash);
    return result;
  },
};
