const authService = require("modules/owner/auth/services/authService");
const responseUtils = require("utils/responseUtils");
// const crypto = require('crypto');

// const secretKey = process.env.JWT_SECRET_KEY;
// const refreshSecretKey = crypto.randomBytes(32).toString('hex');

const authController = {
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      return responseUtils.ok(res, data);
    } catch (error) {
      return responseUtils.userError(res, error.message);
    }
  },

  signUp: async (req, res) => {
    try {
      const { username, email, birthday, password, confirmPassword, address, role_id } = req.body;
      const newUser = await authService.createUser(username, email, birthday, password, confirmPassword, address, role_id);
      return responseUtils.ok(res, newUser);
    } catch (error) {
      return responseUtils.userError(res, error.message);
    }
  },

  resPass: async (req, res) => {
    try {
      const { email, password, confirmPassword } = req.body;
      const data = await authService.resetPassword(email, password, confirmPassword);
      return responseUtils.ok(res, data);
    } catch (error) {
      return responseUtils.userError(res, error.message);
    }
  },

  // refreshToken: async (req, res) => {
  //   try {
  //     const { refreshToken } = req.body;
  //     if (!refreshToken) return res.status(401).json({ message: 'Refresh token is required' });

  //     const user = await db.User.findOne({ where: { refreshToken } });
  //     if (!user) return res.status(403).json({ message: 'Invalid refresh token' });

  //     jwt.verify(refreshToken, refreshSecretKey, (err, decoded) => {
  //       if (err) return res.status(403).json({ message: 'Invalid refresh token' });

  //       const newAccessToken = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '15m' });
  //       const newRefreshToken = jwt.sign({ userId: user.id }, refreshSecretKey, { expiresIn: '7d' });

  //       // Cập nhật refreshToken mới trong cơ sở dữ liệu
  //       user.refreshToken = newRefreshToken;
  //       user.save();

  //       return res.status(200).json({
  //         success: true,
  //         data: {
  //           accessToken: newAccessToken,
  //           refreshToken: newRefreshToken
  //         },
  //         status: 200,
  //         message: 'ok'
  //       });
  //     });
  //   } catch (error) {
  //     return responseUtils.error(res, message);
  //   }
  // }
};

module.exports = authController;
