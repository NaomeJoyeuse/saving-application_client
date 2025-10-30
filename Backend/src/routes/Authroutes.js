const express = require('express');
const AuthController = require('../controllers/AuthController');
const { validate } = require('../middleware/validate');
const { Validators } = require('../utils/validators');

const router = express.Router();
const authController = new AuthController();

// Customer routes
router.post(
  '/register',
  validate(Validators.registerUser),
  (req, res, next) => authController.registerCustomer(req, res, next)
);

router.post(
  '/login',
  validate(Validators.loginUser),
  (req, res, next) => authController.loginCustomer(req, res, next)
);

// Admin route
router.post(
  '/admin-login',
  validate(Validators.adminLogin),
  (req, res, next) => authController.loginAdmin(req, res, next)
);

module.exports = router;