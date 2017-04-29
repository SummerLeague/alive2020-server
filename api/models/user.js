module.exports = function(sequelize, DataTypes) {
  var User = {};

  User.Schema = {
    username : DataTypes.STRING,
    email : DataTypes.STRING,
    passwordHash : DataTypes.STRING,
    passwordSalt : DataTypes.STRING,
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
    }
  };

  return sequelize.define("User", User.Schema, {
    classMethods: User.ClassMethods
  });
};
