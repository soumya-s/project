var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userHumanApiSchema = new Schema({
	  accessToken  : { type: String},
      publicToken  : {type: String},
      clientUserId : { type: String},
      humanId      : {type: String}
   
});
module.exports = mongoose.model('userHumanApi', userHumanApiSchema);
