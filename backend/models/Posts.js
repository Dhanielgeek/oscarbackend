module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('Posts', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Posts;
  };