var bcrypt = require("bcrypt");


module.exports = function(sequelize, DataTypes) {
  var User = {};


  User.Schema = {
    username : {
      type : DataTypes.STRING,
      unique : true
    },
    email : {
      type : DataTypes.STRING,
      unique : true
    },
    password : DataTypes.STRING,
    authToken : DataTypes.STRING,
    authTokenExpiresAt : DataTypes.DATE,
    passwordResetToken : DataTypes.STRING,
    passwordResetTokenExpiresAt : DataTypes.DATE,
  };


  User.ClassMethods = {
    findByUsername : function(username, cb) {
      process.nextTick(function() {
        for (var i = 0, len = records.length; i < len; i++) {
          var record = records[i];

          if (record.username === username) {
            return cb(null, record);
          }
        }
        return cb(null, null);
      });
    },
    generateHash : function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(16), null);
    }
  };


  User.InstanceMethods = {
    validPassword : function(password) {
      return bcrypt.compareSync(password, this.password);
    }
  };


  return sequelize.define("User", User.Schema, {
    classMethods : User.ClassMethods,
    instanceMethods : User.InstanceMethods
  });
};
