"use strict";

var AWS = require("aws-sdk");

var s3 = new AWS.S3();

exports.handler = function(event, context) {
  console.log("Beginning Cleanup of Input Bucket");

  var payload = JSON.parse(event.Records[0].Sns.Message),
      bucket = payload.bucket,
      key = payload.key;

  s3.deleteObject({
    Bucket : bucket,
    Key : key
  }, function(err) {
    if (err) {
      console.log("Error deleting file in input bucket with name '" + bucket + " and for input key '" + key + "'");
      console.log(err, err.stack); // an error occurred
      context.fail();
      return;
    }

    context.succeed("Cleanup of Input Bucket Completed");
  });
};
