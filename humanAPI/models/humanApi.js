var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var HumanApiSchema = new Schema({
	foodDetails :{ type: Array}
  
});
module.exports = mongoose.model('HumanApi', HumanApiSchema);
