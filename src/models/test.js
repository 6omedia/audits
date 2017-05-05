var mongoose = require('mongoose');
var TestSchema = new mongoose.Schema(
	{
		short: {
			type: String
		},
		question: {
			type: String,
			unique: true
		},
		help: {
			type: String
		},
		helpImg: {
			type: String
		}
	}
);

var Tests = mongoose.model('Tests', TestSchema);
module.exports = Tests;