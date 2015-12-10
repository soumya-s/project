var express   =   require('express');
var router    =   express.Router();
var request   =   require('request');
var Response  =   require('../helper/response');
var HumanApi  =   require('../models/humanApi');
var UserHumanApi  =   require('../models/userHumanApi');


router.post('/',function(req, res, next) {

    /* For authenticating the user with the  humanApi the data from the client along with the client secret 
       is send to humanApi */

    var sessionTokenObject = req.body;

    // Adding client secret,obtained from human api developer site to the sessionTokenObject for completing authentication. 

 sessionTokenObject.clientSecret = '8e613b545b8dae89ee881604a24d493864be31ad';

    // demo
 //sessionTokenObject.clientSecret = '60eb6f0215f962fd044ec3f597a4d7a91bdd47f9';
        
    request({
              method: 'POST',
              uri: 'https://user.humanapi.co/v1/connect/tokens',
              json: sessionTokenObject
            },function(err, resp, body) {
                  if (err) {          
                    Response.failure(err,"Some Error Occurred.");
                   } 
                   else{  
                          if(body.publicToken) {
                              // assigning details to token object
                               var tokenObject = {
                                accessToken  : body.accessToken,
                                publicToken  : body.publicToken,
                                clientUserId : body.clientUserId,
                                humanId      : body.humanId
                                };
                                 
                                UserHumanApi.findOne({
                                  clientUserId:tokenObject.clientUserId,
                                  humanId     :tokenObject.humanId
                                },function(err,humanApiResponse) {
                                         
                                    if(humanApiResponse) //to check whether the response is an empty array
                                      {
                                         UserHumanApi
                                            .update(
                                              {
                                                    clientUserId:tokenObject.clientUserId},
                                                {
                                                  '$set':{
                                                    
                                                      publicToken  : body.publicToken,
                                                      accessToken  : body.accessToken
                                                     
                                                  }
                                              },function(err,updateDetails) {
                                                console.log("update",updateDetails);

                                                 });
                                          }
                                      else
                                       {
                                            var userHumanApi   = new UserHumanApi(tokenObject);                                     
                                            userHumanApi.save(function(error,humanApiResponse) {
                                              });
                                                  // saving new entry to datab
                                        }
                                
                                      });
                                  res.status(201).send({ 
                                  publicToken: tokenObject
                                });
                                      
                               }
                              else{
                                var errorMessage = body.message;
                               console.log(body);
                               console.log("errorMessage",errorMessage);
                              
                                res.status(422).send({ 
                                  message: errorMessage
                                });                                                       
                                }          
                               
                            }
                           

                });

        });

    // router.post('/humanapiUser',Authentication.authenticate,function(req, res, next) {
    //     var humanapi   = new HumanApi();
    //        var jsonObj = JSON.parse(data);
    //        humanapi.foodDetails=jsonObj;
    //              humanapi.save(function(err,humanApiResponse) {
    //           if (err) {  
                
    //               console.log(err);
    //            }
    //           else {
    //                    console.log(humanApiResponse);
    //           }
    //         });

    //   }):

      /* To get the test results of a specific user from humanAPI*/

  router.get('/testResults',function(req, res, next) {
     // UserHumanApi.findOne({
     //                              clientUserId:tokenObject.clientUserId,
     //                              humanId     :tokenObject.humanId
     //                            },function(err,humanApiResponse) {


        // url: 'http://localhost:3000/humanApi' + site_id + '/posts/new', \
       var access_token="kU3fJ6rNRNRAgxOT3m3mD7O4IVM=YuotgsmY56f9f018637e5fdec12ca692120933f2c78fd9d507c5a5c08e445d478720580d812986058bafb8694d61e10b9b3de905c46627740d54a7f5dea881ef733c00aadf5250a0a19e502b3ab877c2958b54a34bdf7f6cd7f1d4259adbca3d4764150f0fdd3178345dbbbb5fa81a945f4addd6";


        var headers = {
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json'
}

     request({
              method: 'GET',
              uri: 'https://api.humanapi.co/v1/human/medical/test_results?access_token',
              headers : headers
            },function(err, resp, body) {
                  if (err) {          
                    Response.failure(err,"Some Error Occurred.");
                   }else{
                     var data=body; 
                     var jsonObj = JSON.parse(data);
                     Response.success(res,jsonObj,"200");

                   }
          });

  });


router.get('/',function(req, res, next) {

  /*  To get specific user details with the provided human id from server*/

  HumanApi.find({"foodDetails.humanId":"03dde4258306abcaa71087d6373cf67b"}, function(err,humanApiResponse) {
         if(err){
            Response.failure(res,"Some error occured.");
      }
      else {  
        if(humanApiResponse.length>0) //to check whether the response is an empty array
        {

             Response.success(res, humanApiResponse,"200");
  
        }
        else
          {
             Response.success(res, "No data related to the search.","200");

          }
        }
  });
});

var update_since   = new Date();
 var  update_before  = new Date(update_since);
 update_before.setHours (update_since.getHours() + 1);

router.get('/data', function(req, res, next) {
  //console.log(update_since);
              console.log("before",update_before);
              console.log("since",update_since);

              update_since.setHours (update_since.getHours()+ 1);
              update_before.setHours (update_before.getHours() + 1);
              // var fourHoursLater = now.addHours(4);
              console.log("since",update_since);
              console.log("before",update_before);

          res.send(201, update_before);
  });



module.exports = router;
