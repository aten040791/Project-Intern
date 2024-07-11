const db = require("models/index");
const { sign, signRefreshToken } = require("utils/jwtUtils");
const bcrypt = require("bcryptjs");
const { admin } = require("middlewares/authVerify");

module.exports = {
  login: async (email, password) => {
    const user = await db.User.findOne({ where: { email } });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new Error("Invalid password");

    const role = await db.Role.findOne({ where: { id: user.role_id } });

    const access_token = sign(user.id, role.name);
    const refresh_token = signRefreshToken(user.id, role.name);

    return {
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        email: user.email,
        role: role.name,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
      access_token: access_token,
      refresh_token: refresh_token,
    };
  },
};
