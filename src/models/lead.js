var mongoose = require('mongoose');
var LeadSchema = new mongoose.Schema(
	{
		company: String,
		date: Date,
		view_count: {
			type: Number,
			default: 0
		},
		duration: {
			type: Number,
			default: 0
		},
		contact: {
			type: Boolean,
			default: false
		},
		name: {
			type: String,
			default: ''
		},
		contact_method: {
			type: String,
			default: ''
		},
		contact_value: {
			type: String,
			default: ''
		}
	}
);

// LeadSchema.statics.findLeadByCompany();

var Lead = mongoose.model('Leads', LeadSchema);
module.exports = Lead;

