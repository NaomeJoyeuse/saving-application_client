

const db = require('../models');
const { hashPassword, comparePassword } = require('../utils/passwordEncryption');
const { generateToken } = require('../utils/jwtToken');
const { UserDTO, AuthResponseDTO } = require('../dtos/userDtos');
const { AppError } = require('../middleware/errorhandling');

const User = db.User;
const Device = db.Device;
const Account = db.Account;

class AuthService {
  
  async generateUniqueAccountNumber() {
    let accountNumber;
    let exists = true;

    while (exists) {
      const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
      accountNumber = `CJ${randomDigits}`;
      const existingAccount = await Account.findOne({ where: { accountNumber } });
      if (!existingAccount) {
        exists = false;
      }
    }
    return accountNumber;
  }

  async registerCustomer(email, password, fullName, deviceId) {
    try {
    
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new AppError(400, 'Email already registered');
      }

      
      const hashedPassword = await hashPassword(password);

     
      const user = await User.create({
        email,
        password: hashedPassword,
        fullName,
      });

     
      await Device.create({
        userId: user.id,
        deviceId,
        isVerified: false,
      });

      
      const accountNumber = await this.generateUniqueAccountNumber();

      await Account.create({
        userId: user.id,
        balance: 0,
        accountNumber: accountNumber,
      });

      return {
        userId: user.id,
        email: user.email,
        fullName: user.fullName,
        accountNumber: accountNumber,  
        message: 'User registered successfully. Waiting for device verification.',
      };
    } catch (error) {
      throw error;
    }
  }

async loginCustomer(email, password) {
  try {
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new AppError(401, 'Invalid credentials');
    }

  
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new AppError(401, 'Invalid credentials');
    }

   
    const device = await Device.findOne({
      where: { userId: user.id, isVerified: true },
    });

    if (!device) {
      throw new AppError(
        403,
        'No verified device found for this account. Please wait for admin verification.'
      );
    }

   
    const token = generateToken(user.id, user.email);

    return new AuthResponseDTO(token, user);
  } catch (error) {
    throw error;
  }
}


  async loginAdmin(email, password) {
    try {
      const ADMIN_EMAIL = 'admin@savings.com';
      const ADMIN_PASSWORD = 'admin123';

      if (email !== ADMIN_EMAIL) {
        throw new AppError(401, 'Invalid admin credentials');
      }

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