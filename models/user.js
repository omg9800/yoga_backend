module.exports = (sequelize, Sequelize) => {

  const User = sequelize.define("users", {
    id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey: true,
     },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age:{
      type:Sequelize.INTEGER,
      allowNull: false,
      validate:{
        max:60,min:18
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    phone:{
      type:Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  return User;
};