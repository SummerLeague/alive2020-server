var uuidV4 = require("uuid/v4");


module.exports = function(sequelize, DataTypes) {
  var StoryJob = {};


  StoryJob.Schema = {
    active : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : true
    },
    referenceId : {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true
    },
    transcodeComplete : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : false
    },
    transcodeCompletedAt : {
      type : DataTypes.DATE,
      allowNull : true
    },
    userId : {
      allowNull : false,
      type : DataTypes.INTEGER,
      references : {
        model : "User",
        key : "id"
      }
    }
  };


  StoryJob.ClassMethods = {
  };


  StoryJob.InstanceMethods = {
  };


  StoryJob.Hooks = (function () {
    function generateReferenceId(storyJob, options, next) {
      storyJob.referenceId = uuidV4();
      next();
    }

    return {
      beforeValidate : generateReferenceId
    }
  })();


  return sequelize.define("StoryJob", StoryJob.Schema, {
    classMethods : StoryJob.ClassMethods,
    instanceMethods : StoryJob.InstanceMethods,
    hooks : StoryJob.Hooks
  });
};
