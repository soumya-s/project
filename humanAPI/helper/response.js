module.exports.success=function(res, msg,statuscode) {
	return res.json ({
      success: true,
      code:statuscode,
      message:msg
    }); 
};
module.exports.failure = function(res,msg) {
 return res.json ({
      success: false,
      code:"400",
      message:msg
    });

 
};