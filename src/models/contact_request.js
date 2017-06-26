var mongoose = require('mongoose');
var ContactRequestSchema = new mongoose.Schema(
	{
		company: String,
		name: String,
		contact_method: String,
		contact_value: String
	}
);

var ContactRequest = mongoose.model('Contact Request', ContactRequestSchema);
module.exports = ContactRequest;

