var HumanApi = require('../helper/humanApi');
var CronJob = require('cron').CronJob;
    module.exports = { 
        startServiceFromCronJobManager: function () {
          var CronJob = require('cron').CronJob;
          var job = new CronJob({
            cronTime :'*/5 * * * * *',//runs every  5 second
           // cronTime: '00 21 20 * * 1-7',
              onTick: function() {
                //call for human api query for updated data
                 HumanApi.humanapiBatchQuery();  
                 //HumanApi.check();
                 },
              start: false
    });
  job.start();
         
      }
    };

