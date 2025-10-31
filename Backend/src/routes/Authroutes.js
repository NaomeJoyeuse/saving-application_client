const express = require('express');
const AuthController = require('../controllers/AuthController');
const { validate } = require('../middleware/validate');
const { Validators } = require('../utils/validators');

const router = express.Router();
const authController = new AuthController();


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User and Admin authentication routes
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new customer
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Registration successful
 *       400:
 *         description: Invalid request data
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login as a customer
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 123e4567-e89b-12d3-a456-426614174000
 *                     fullName:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *       401:
 *         description: Invalid credentials
 */


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


// router.post(
//   '/admin-login',
//   validate(Validators.adminLogin),
//   (req, res, next) => authController.loginAdmin(req, res, next)
// );

module.exports = router;