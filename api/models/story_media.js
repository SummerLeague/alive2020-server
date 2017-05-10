module.exports = function(sequelize, DataTypes) {
  var StoryMedia = {};


  StoryMedia.Schema = {
    key : {
      allowNull : false,
      type : DataTypes.STRING
    },
    type : {
      allowNull : false,
      type : DataTypes.STRING
    },
    width : {
      allowNull : false,
      type : DataTypes.INTEGER
    },
    height : {
      allowNull : false,
      type : DataTypes.INTEGER
    },
    duration : {
      allowNull : false,
      type : DataTypes.INTEGER
    }
  };


  StoryMedia.ClassMethods = {
    associate : function(models) {
      models.StoryMedia.belongsTo(models.Story, {
        as : "story",
        foreignKey : "storyId"
      });
    },

    extensionForKey : function(key) {
      var match = key.match(/(\.(\w+))$/),
          extension;

      if (match) {
        extension = match[2]; // We just want the part after the `.`
      }

      return extension;
    }
  };


  StoryMedia.InstanceMethods = {
  };


  StoryMedia.Hooks = (function() {
    function setFileType(storyMedia, options, next) {
      if (storyMedia.changed("key")) {
        storyMedia.type = sequelize.models.StoryMedia.extensionForKey(storyMedia.key);
      }
      next();
    }

    return {
      beforeValidate : setFileType
    }
  })();


  return sequelize.define("StoryMedia", StoryMedia.Schema, {
    classMethods : StoryMedia.ClassMethods,
    instanceMethods : StoryMedia.InstanceMethods,
    hooks : StoryMedia.Hooks
  });
};
