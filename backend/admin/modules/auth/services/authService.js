const db = require("models/index");
const { hash, compare } = require("kernels/hash/index");
const { sign, signRefreshToken } = require("utils/jwtUtils");
const { setItem, getItem, removeToken } = require("helpers/localStorage");

module.exports = {
  // getUser: async (user) => {
  //   const result = await db.User.findOne({
  //     where: { email: user.email },
  //   });
  //   if (result) {
  //     return result.dataValues;
  //   } else {
  //     throw new Error("Email is not exists");
  //   }
  // },
  // createUser: async (user) => {
  //   const checkUser = await db.User.findOne({
  //     where: { email: user.email },
  //   });
  //   if (!checkUser) {
  //     const newUser = await db.User.create(user);
  //     return newUser;
  //   } else {
  //     throw new Error("Email existed");
  //   }
  // },
  login: async (email, password) => {
    const user = await db.User.findOne({ where: { email } });
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");
    const role = await db.Role.findOne({ where: { id: user.role_id } });
    const access_token = sign(user.id, role.name);
    const refresh_token = signRefreshToken(user.id, role.name);
    setItem("accessToken", access_token);
    setItem("refreshToken", refresh_token);
    setItem("userID", user.id);
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: role.name,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
      access_token: access_token,
      refresh_token: refresh_token,
    };
  },
  logout: async (refreshToken) => {
    // remove in localstorage
    removeItem("refreshToken");
  },
};
