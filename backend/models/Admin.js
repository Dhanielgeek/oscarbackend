module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [["ceo", "blogger"]]
        }
      },
    });
  
    return Admin;
  };