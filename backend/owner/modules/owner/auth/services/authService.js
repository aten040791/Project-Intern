const jwt = require("jsonwebtoken");
const { sign, signRefreshToken } = require("utils/jwtUtils");
const bcrypt = require("bcrypt");
const db = require("models/index");

const authService = {
  login: async (email, password) => {
    const user = await db.User.findOne({ where: { email } });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");
    const role = await db.Role.findOne({ where: { id: user.role_id } });
    const access_token = sign(user.id, role.name);
    const refresh_token = signRefreshToken(user.id, role);
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role_id: role.name,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
      access_token: access_token,
      refresh_token: refresh_token,
    };
  },

  createUser: async (body) => {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await db.User.create({
      username: body.username,
      email: body.email,
      birthday: body.birthday,
      password: hashedPassword,
      phone: body.phone,
      address: body.address,
      role_id: body.role_id ? body.role_id : 1,
    });
    return newUser;
  },

  resetPassword: async (email, password) => {
    const user = await db.User.findOne({ where: { email } });
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    return { message: "Password reset successfully" };
  },

  // refreshToken: async (refreshToken) => {
  //   console.log(config.refreshTokenSecret);
  //   try {
  //     const decoded = jwt.verify(refreshToken, config.refreshTokenSecret);
  //     const user = await db.User.findOne({ where: { id: decoded.id } });

  //     const role = await db.Role.findOne({ where: { id: user.role_id } });

  //     const newAccessToken = sign(user.id, role.name);
  //     const newRefreshToken = signRefreshToken(user.id, role);

  //     return {
  //       accessToken: newAccessToken,
  //       refreshToken: newRefreshToken,
  //       user: {
  //         id: user.id,
  //         username: user.username,
  //         email: user.email,
  //         role_id: role.name,
  //         created_at: user.createdAt,
  //         updated_at: user.updatedAt,
  //       },
  //     };
  //   } catch (err) {
  //     throw new Error("Invalid refresh token");
  //   }
  // },

};

module.exports = authService;
