"use strict";

var AWS = require("aws-sdk");

var s3 = new AWS.S3();

var eltr = new AWS.ElasticTranscoder({
  region : "us-east-1"
});

var sns = new AWS.SNS();

exports.handler = function(event, context) {
  console.log("Executing Elastic Transcoder");

  var bucket = event.Records[0].s3.bucket.name,
      key = event.Records[0].s3.object.key,
      pipelineId = "1495422275809-xilljf";

  var srcKey = decodeURIComponent(key.replace(/\+/g, " ")), // the object may have spaces
      newKey = key.split(".")[0],
      eltrParams = {
        PipelineId : pipelineId,
        OutputKeyPrefix : newKey + "/",
        Input : {
          Key : srcKey,
          FrameRate : "auto",
          Resolution : "auto",
          AspectRatio : "auto",
          Interlaced : "auto",
          Container : "auto"
        },
        Outputs : [
          {
            Key : "mp4-" + newKey + ".mp4",
            PresetId : "1351620000001-000010" // Generic 720p
          },
          {
            Key : "webm-" + newKey + ".webm",
            PresetId : "1351620000001-100240" // Webm 720p
          }
        ]
      };

  console.log("Starting Job");

  eltr.createJob(eltrParams, function(err, data) {
    if (err) {
      console.log("Error running transcode pipeline with id '" + pipelineId + " for input key '" + newKey + "'");
      console.log(err, err.stack); // an error occurred
      context.fail();
      return;
    }

    var snsMessage = JSON.stringify({
          bucket : bucket,
          key : key
        }),
        snsParams = {
          Message : snsMessage,
          Subject : "Input Bucket Cleanup SNS",
          TopicArn : "arn:aws:sns:us-east-1:164154420546:alive2020-bradley-s3-input-bucket-cleanup"
        };

    sns.publish(snsParams, function(err, data) {
      if (err) {
        console.log("Error sending SNS for pipeline with id '" + pipelineId + " and for input key '" + newKey + "'");
        console.log(err, err.stack); // an error occurred
        // Note: We do not return or fail here, as the transcode was still successful
        //   and an error at this step should not prevent the server from being notified.
      }

      context.succeed("Elastic Transcoder Completed");
    });
  });
};
