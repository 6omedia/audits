var mongoose = require('mongoose');
var CompetitorSchema = new mongoose.Schema(
	{
		company_name: String,
		company_website: String,
		practice_areas: Array,
		postcode: String,
		tests: Array,
		score: Number
	}
);

var Competitor = mongoose.model('Competitors', CompetitorSchema);
module.exports = Competitor;

