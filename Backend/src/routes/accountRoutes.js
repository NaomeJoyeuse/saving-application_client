const express = require('express');
const AccountController = require('../controllers/accountController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();
const accountController = new AccountController();

router.use(authMiddleware);


/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Account management and transactions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         type:
 *           type: string
 *           enum: [DEPOSIT, WITHDRAW]
 *         amount:
 *           type: number
 *           example: 500
 *         balanceBefore:
 *           type: number
 *           example: 2000
 *         balanceAfter:
 *           type: number
 *           example: 2500
 *         description:
 *           type: string
 *           example: Deposit for savings
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     Account:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         balance:
 *           type: number
 *           example: 7500
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     DepositInput:
 *       type: object
 *       required: [amount]
 *       properties:
 *         amount:
 *           type: number
 *           example: 200
 *         description:
 *           type: string
 *           example: Deposit to account
 *
 *     WithdrawInput:
 *       type: object
 *       required: [amount]
 *       properties:
 *         amount:
 *           type: number
 *           example: 150
 *         description:
 *           type: string
 *           example: Withdrawal for groceries
 */

/**
 * @swagger
 * /api/account/balance:
 *   get:
 *     summary: Get account balance
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account balance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Balance retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: number
 *                       example: 7850
 *
 * /api/account/details:
 *   get:
 *     summary: Get full account details
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *
 * /api/account/transactions:
 *   get:
 *     summary: Get transaction history
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: Transaction history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *
 * /api/account/deposit:
 *   post:
 *     summary: Deposit money into account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DepositInput'
 *     responses:
 *       201:
 *         description: Deposit successful
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
 *                   example: Deposit successful
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *
 * /api/account/withdraw:
 *   post:
 *     summary: Withdraw money from account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WithdrawInput'
 *     responses:
 *       201:
 *         description: Withdrawal successful
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
 *                   example: Withdrawal successful
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *
 * /api/account/low-balance:
 *   get:
 *     summary: Check if account has low balance
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: threshold
 *         schema:
 *           type: number
 *           default: 1000
 *     responses:
 *       200:
 *         description: Low balance check result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: boolean
 *                   example: false
 */

router.get('/balance', (req, res, next) =>
  accountController.getBalance(req, res, next)
);


router.get('/details', (req, res, next) =>
  accountController.getAccount(req, res, next)
);
router.get('/transactions', (req, res, next) =>
  accountController.getTransactionHistory(req, res, next)
);

router.get('/low-balance', (req, res, next) =>
  accountController.checkLowBalance(req, res, next)
);

router.post('/deposit', (req, res, next) =>
  accountController.deposit(req, res, next)
);


router.post('/withdraw', (req, res, next) =>
  accountController.withdraw(req, res, next)
);

module.exports = router;