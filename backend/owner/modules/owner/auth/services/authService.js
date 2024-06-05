const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("models/index");

const secretKey = process.env.JWT_SECRET_KEY;

const authService = {
  login: async (email, password) => {
    const user = await db.User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");
    
    const role = await db.Role.findOne({ where: { id: user.role_id } });
    if (!role) throw new Error("Role not found");

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

  createUser: async ( username, email, birthday, password, confirmPassword, address, role_id ) => {
    const user = await db.User.findOne({ where: { email } });
    if (user) throw new Error("Email is already in used");
    if (password !== confirmPassword) throw new Error("Password and confirm password do not match");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.User.create({
      username,
      email,
      birthday,
      password: hashedPassword,
      address,
      role_id,
    });
    return newUser;
  },

  resetPassword: async (email, password, confirmPassword) => {
    if (password !== confirmPassword) throw new Error("Password and confirm password do not match");
    try {
      const user = await db.User.findOne({ where: { email } });
      if (!user) return { error: "User not found" };

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();

      return { message: "Password reset successfully" };
    } catch (error) {
      return { error: "Error resetting password" };
    }
  },
};

module.exports = authService;
