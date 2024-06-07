const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("models/index");

const secretKey = process.env.JWT_SECRET_KEY;

const authService = {
  login: async (email, password) => {
    const user = await db.User.findOne({ where: { email } });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");
    const role = await db.Role.findOne({ where: { id: user.role_id } });
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1y" });
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role_id: role.name,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
      access_token: token,
    };
  },

  createUser: async (body) => {
    console.log(body.email);
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await db.User.create({
      username: body.username,
      email: body.email,
      birthday: body.birthday,
      password: hashedPassword,
      phone: body.phone,
      address: body.address,
      role_id: body.role_id,
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
};

module.exports = authService;
