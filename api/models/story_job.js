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
    rawResponse : {
      type : DataTypes.TEXT
    },
    responseState : {
      type : DataTypes.STRING
    },
    responseReceivedAt : {
      type : DataTypes.DATE,
      allowNull : true
    }
  };


  StoryJob.ClassMethods = {
    associate: function(models) {
      models.StoryJob.belongsTo(models.User, {
        as : "user",
        foreignKey : "userId"
      });
      models.StoryJob.hasOne(models.Story, {
        as : "story",
        foreignKey : "storyJobId"
      });
    }
  };


  StoryJob.InstanceMethods = {
    forPrimaryStory : function() {
      var storyJob = this;

      return new Promise(function(resolve, reject) {
        sequelize.models.StoryJob.count({
          where : {
            id : {
              $not : storyJob.id
            },
            responseState : "COMPLETED",
            userId : storyJob.userId,
            createdAt : {
              $gt : Date.parse(storyJob.createdAt)
            }
          }
        }).then(function(count) {
          console.log("COUNT =======> " + count);
          resolve(count == 0);
        }).catch(function(err) {
          reject(err);
        });
      });
    }
  };


  StoryJob.Hooks = (function() {
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
