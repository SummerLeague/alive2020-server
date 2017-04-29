module.exports = function(sequelize, DataTypes) {
  var BatchUpload = {};

  BatchUpload.Schema = {
    active : DataTypes.BOOLEAN,
    s3ReferenceId : DataTypes.STRING,
    uploadComplete : DataTypes.BOOLEAN,
    transcodeComplete : DataTypes.BOOLEAN,
    awsTranscodeNoticeSent : DataTypes.BOOLEAN
  };

  BatchUpload.ClassMethods = {
    associate: function(models) {
      // BatchUpload.belongsTo(models.User, {
      //   onDelete: "CASCADE",
      //   foreignKey: {
      //     allowNull: false
      //   }
      // });
    }
  };

  return sequelize.define("BatchUpload", BatchUpload.Schema, {
    classMethods: BatchUpload.ClassMethods
  });
};
