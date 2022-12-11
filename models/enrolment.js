module.exports = (sequelize, Sequelize) => {

const Enrolment = sequelize.define("enrolments", {
      id:{
       type:Sequelize.INTEGER,
       allowNull:false,
       autoIncrement:true,
       primaryKey: true,
      },
      enroledMonth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      }
      
    });

    return Enrolment;
  };
