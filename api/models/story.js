module.exports = function(sequelize, DataTypes) {
  var Story = {};


  Story.Schema = {
    active : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : true
    },
    primaryStory : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : false
    },
    outputKeyPrefix : {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true
    }
  };


  Story.ClassMethods = {
    associate : function(models) {
      models.Story.belongsTo(models.User, {
        as : "user",
        foreignKey : "userId"
      });
      models.Story.belongsTo(models.StoryJob, {
        as : "storyJob",
        foreignKey : "storyJobId"
      });
      models.Story.hasMany(models.StoryMedia, {
        as : "story",
        foreignKey : "storyId"
      });
    }
  };


  Story.InstanceMethods = {
  };


  Story.Hooks = (function() {
    function setToPrimaryStory(story, options, next) {
      sequelize.models.StoryJob.findOne({
        where : { id : story.storyJobId }
      })
      .then(function(storyJob) {
        storyJob.forPrimaryStory().then(function(forPrimaryStory) {
          story.primaryStory = forPrimaryStory;

          setAllOthersToNotPrimaryStory(story, options, next);
        });
      })
      .catch(function(err) {
        next(err);
      });
    }

    function setAllOthersToNotPrimaryStory (story, options, next) {
      if (!(story.changed("primaryStory") && story.primaryStory === true)) return next();

      sequelize.models.Story.update({ primaryStory : false }, {
        where : {
          id : {
            $not : story.id
          },
          userId : story.userId,
          primaryStory : true
        }
      })
      .then(function() {
        next();
      })
      .catch(function(err) {
        console.log(err);
        next(err);
      });
    }

    return {
      beforeCreate : setToPrimaryStory,
      beforeUpdate : setAllOthersToNotPrimaryStory
    };
  })();


  return sequelize.define("Story", Story.Schema, {
    classMethods : Story.ClassMethods,
    instanceMethods : Story.InstanceMethods,
    hooks : Story.Hooks
  });
};
