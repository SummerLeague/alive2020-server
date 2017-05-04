var bcrypt = require("bcrypt"),
    jwt = require("jsonwebtoken");


module.exports = function(sequelize, DataTypes) {
  var User = {};


  User.Schema = {
    active : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : true
    },
    username : {
      type : DataTypes.STRING,
      unique : {
        args : true,
        msg : "Username already taken."
      },
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : "Username may not be blank."
        },
        len : {
          args : [1, 15],
          msg : "Username may not be more than 15 characters."
        }
      }
    },
    email : {
      type : DataTypes.STRING,
      unique : {
        args : true,
        msg : "Email already taken."
      },
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : "Email must be provided."
        },
        isEmail : {
          args : true,
          msg : "That doesn't appear to be a valid email address."
        }
      }
    },
    password : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : "Password may not be blank."
        },
        isValidLength : function(value) {
          if (value.length < 6) {
            throw new Error("Password must be at least 6 characters.");
          } else if (value.length > 128) {
            throw new Error("Password may be no longer than 128 characters.");
          }
        }
      }
    }
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
      var SALT_FACTOR = 5;

      return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR), null);
    }
  };


  User.InstanceMethods = {
    validPassword : function(password) {
      return bcrypt.compareSync(password, this.password);
    },

    generateJWTToken : function() {
      var EXPIRY = "30s"; // zeit/ms

      var payload = {
            id : this.id,
            username : this.username,
            email : this.email
          },
          options = {
            expiresIn : EXPIRY
          };

      return jwt.sign(payload, process.env.APP_SECRET, options);
    }
  };


  User.Hooks = (function () {
    function hashPassword(user, options, next) {
      if (!user.changed("password")) return next();
      user.password = sequelize.models.User.generateHash(user.get("password"));
      next();
    }

    return {
      beforeCreate : hashPassword,
      beforeUpdate : hashPassword
    }
  })();


  return sequelize.define("User", User.Schema, {
    classMethods : User.ClassMethods,
    instanceMethods : User.InstanceMethods,
    hooks : User.Hooks
  });
};
