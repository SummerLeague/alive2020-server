"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    // NOTE:
    //   WE NEED TO PAY CLOSE ATTENTION FOR THE 4.0 RELEASE OF SEQUELIZE.
    //   IT WILL ADD SUPPOT FOR { alter: true } DURING SYNCING, AND MAY REMOVE
    //   THE NEED FOR MIGRATION FILES (TABLES WILL `ALTER` BASED ON DIFFS WHEN SYNCING
    //   RATHER THAN DROPPING/CREATING).

    // return Promise.all([
    //   queryInterface.createTable("Users", {
    //     username : {
    //       type : Sequelize.STRING,
    //       unique : true
    //     },
    //     email : {
    //       type : Sequelize.STRING,
    //       unique : true
    //     },
    //     password : Sequelize.STRING,
    //     authToken : Sequelize.STRING,
    //     authTokenExpiresAt : Sequelize.DATE,
    //     passwordResetToken : Sequelize.STRING,
    //     passwordResetTokenExpiresAt : Sequelize.DATE,
    //   })
    // ])
  },

  down: function (queryInterface, Sequelize) {
    // queryInterface.dropTable("User");
  }
};
