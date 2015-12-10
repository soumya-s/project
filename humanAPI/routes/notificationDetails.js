
var express   =   require('express');
var router    =   express.Router();
var request   =   require('request');
var Response  =   require('../helper/response');
var HumanApi  =   require('../models/humanApi');
var Notification = require('../models/notificationDetails');
var UserHumanApi  =   require('../models/userHumanApi');

router.post('/', function(req, res, next) {
  var notification = new Notification(req.body);
   
  notification.save(function(err, sleepResponse) {
    if (err) {
      Response.failure(res, "Not added successfully");
    } else {
      Response.success(res, sleepResponse, "200");
    }
  });
});



module.exports = router;