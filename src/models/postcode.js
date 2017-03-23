var mongoose = require('mongoose');
var PostCodeSchema = new mongoose.Schema(
	{
		postcode: String,
		area_name: String
	}
);

var PostCode = mongoose.model('PracticeAreas', PostCodeSchema);
module.exports = PostCode;

