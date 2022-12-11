module.exports = (sequelize, Sequelize) => {

    const Batch = sequelize.define("batches", {
      id:{
       type:Sequelize.INTEGER,
       allowNull:false,
       autoIncrement:true,
       primaryKey: true,
      },
      startTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      endTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      strengths:{
        type:Sequelize.INTEGER,
        allowNull: false,
      },
      fee:{
        type:Sequelize.INTEGER,
      }
    });

    return Batch;
  };