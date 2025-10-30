const db = require('../models');
const { hashPassword, comparePassword } = require('../utils/passwordEncryption');
const { generateToken } = require('../utils/jwtToken');
const { UserDTO, AuthResponseDTO } = require('../dtos/userDtos');
const { AppError } = require('../middleware/errorhandling');

const User = db.User;
const Device = db.Device;
const Account = db.Account;

class AuthService {
  async registerCustomer(email, password, fullName, deviceId) {
    try {
      // Check if user exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new AppError(400, 'Email already registered');
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user
      const user = await User.create({
        email,
        password: hashedPassword,
        fullName,
      });

      // Create device (unverified)
      await Device.create({
        userId: user.id,
        deviceId,
        isVerified: false,
      });

      // Create account
      await Account.create({
        userId: user.id,
        balance: 0,
      });

      return {
        userId: user.id,
        email: user.email,
        fullName: user.fullName,
        message: 'User registered successfully. Waiting for device verification.',
      };
    } catch (error) {
      throw error;
    }
  }

  async loginCustomer(email, password, deviceId) {
    try {
      // Find user
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new AppError(401, 'Invalid credentials');
      }

      // Verify password
      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        throw new AppError(401, 'Invalid credentials');
      }

      // Check device verification
      const device = await Device.findOne({ where: { deviceId } });
      if (!device || !device.isVerified) {
        throw new AppError(403, 'Device not verified. Please wait for admin verification.');
      }

      // Generate token
      const token = generateToken(user.id, user.email);

      return new AuthResponseDTO(token, user);
    } catch (error) {
      throw error;
    }
  }

  async loginAdmin(email, password) {
    try {
      // For admin, we'll check a hardcoded admin or from a separate admin table
      // For now, simple hardcoded admin (in production, use admin table)
      const ADMIN_EMAIL = 'admin@savings.com';
      const ADMIN_PASSWORD = 'admin123'; // In production, this is hashed

      if (email !== ADMIN_EMAIL) {
        throw new AppError(401, 'Invalid admin credentials');
      }

      // In production, compare hashed password
      if (password !== ADMIN_PASSWORD) {
        throw new AppError(401, 'Invalid admin credentials');
      }

      const token = generateToken('admin-id', email);

      return {
        token,
        admin: {
          id: 'admin-id',
          email: email,
          fullName: 'Admin',
        },
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;