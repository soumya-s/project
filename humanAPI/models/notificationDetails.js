var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var NotificationSchema = new Schema({
	foodDetails :{ type: Array}
  
});
module.exports = mongoose.model('Notification', NotificationSchema);
