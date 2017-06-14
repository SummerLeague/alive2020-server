'use strict';

var AWS = require('aws-sdk');

var s3 = new AWS.S3();

var eltr = new AWS.ElasticTranscoder({
  region: 'us-east-1'
});

exports.handler = function(event, context) {
  console.log('Executing Elastic Transcoder');

  var bucket = event.Records[0].s3.bucket.name,
      key = event.Records[0].s3.object.key,
      pipelineId = '1492982809700-knyyu2';

  var srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " ")), //the object may have spaces
      newKey = key.split('.')[0],
      params = {
        PipelineId: pipelineId,
        OutputKeyPrefix: newKey + '/',
        Input: {
          Key: srcKey,
          FrameRate: 'auto',
          Resolution: 'auto',
          AspectRatio: 'auto',
          Interlaced: 'auto',
          Container: 'auto'
        },
        Outputs: [{
          Key: 'mp4-' + newKey + '.mp4',
          PresetId: `1351620000001-000010` //Generic 720p
        },{
          Key: 'webm-' + newKey + '.webm',
          PresetId: `1351620000001-100240` //Webm 720p
        }]
      };

  console.log('Starting Job');

  eltr.createJob(params, function(err, data){
    if (err){
      console.log(err);
    } else {
      console.log(data);
    }
  context.succeed('Elastic Transcoder Completed');
  });
};
