'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    'Account',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      accountNumber: {
        type: DataTypes.STRING(10),
        unique: true,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'accounts',
      timestamps: true,
    }
  );

  Account.associate = (models) => {
    Account.belongsTo(models.User, { foreignKey: 'userId' });
    Account.hasMany(models.Transaction, { foreignKey: 'accountId', onDelete: 'CASCADE' });
  };

  
  Account.beforeCreate(async (account) => {
    let accountNumber;
    let exists = true;

    // unique CJ + 6-digit account number
    while (exists) {
      const randomDigits = Math.floor(100000 + Math.random() * 90000);
      accountNumber = `CJ${randomDigits}`;

      const existingAccount = await Account.findOne({ where: { accountNumber } });
      if (!existingAccount) exists = false;
    }

    account.accountNumber = accountNumber;
  });

  return Account;
};
