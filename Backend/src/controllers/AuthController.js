const AuthService = require('../services/AuthService');

const authService = new AuthService();

class AuthController {
  async registerCustomer(req, res, next) {
    try {
      const { email, password, fullName, deviceId } = req.body;
      const result = await authService.registerCustomer(email, password, fullName, deviceId);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async loginCustomer(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.loginCustomer(email, password);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async loginAdmin(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.loginAdmin(email, password);

      res.status(200).json({
        success: true,
        message: 'Admin login successful',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;