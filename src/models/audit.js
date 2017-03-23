var mongoose = require('mongoose');
var AuditSchema = new mongoose.Schema(
	{
		company_name: {
			type: String,
			unique: true
		},
		company_slug: {
			type: String,
			unique: true
		},
		company_website: {
			type: String,
			unique: true
		},
		practice_areas: Array,
		screenshot: String,
		tests: Array,
		competitors: Array
	}
);

var Audits = mongoose.model('Audits', AuditSchema);
module.exports = Audits;

