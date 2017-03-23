var mongoose = require('mongoose');
var PracticeAreaSchema = new mongoose.Schema(
	{
		name: String,
		postcode: String,
		keyword: String,
		search_volume: Number
	}
);

var PracticeArea = mongoose.model('PracticeAreas', PracticeAreaSchema);
module.exports = PracticeArea;