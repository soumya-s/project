var HumanApi  = require('../models/humanApi');

module.exports.humanapiBatchQuery=function(){
    var request = require('request'); 
    //app key from developer portal      
    var username = "e312b24f969eb1e66b0257682f72efa7d2d274bb:", 
    password = "",
    auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

    // Batch query retrieves updated food details

    var options = {
          url:'https://api.humanapi.co/v1/apps/d7831c461258ef9b167d9dc984d6cc5409fec1a3/users/food/meals?updated_since=2015-12-01T12:06:12.149Z', 
          // url:'https://api.humanapi.co/v1/apps/d7831c461258ef9b167d9dc984d6cc5409fec1a3/users/food/meals',
           headers : {
                "Content-Type" :"application/json",
                "Authorization" : auth
               },
          method: 'GET'     
     }
    request(options,function(error,humanapiResp,body) {
      if (error) 
      {
                console.log(error.body);
       }
       else
       {
         if(humanapiResp.length>0) // checks whether there is some updates
          {
              
             var data=humanapiResp.body; 
             var humanapi   = new HumanApi();
             var jsonObj = JSON.parse(data);
              humanapi.foodDetails=jsonObj;

              //  Updated data from the humanapi  is saved to the server.

              humanapi.save(function(err,humanApiResponse) {
              if (err) {
                
                  // Response.failure(res,"Not added successfully");
                    console.log(err);
                }
              else {
                  //Response.success(res,sleepResponse._id,"201");
                  console.log(humanApiResponse);
               }
          });
        
        }
      
      }
  });       
};

