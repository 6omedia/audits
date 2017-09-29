'use strict'

var Audit = require('../models/audit');
var Lead = require('../models/lead');

var AuditInteraction = function(companySlug){
	this.companySlug = companySlug;
}

AuditInteraction.prototype.findLeadByCompany = function(foundCallBack, notFoundCallback){

	Audit.findOne({'company_slug': this.companySlug}).select({'company_name': 1}).exec(function(err, audit){

		if(!err){

			var companyName = audit.company_name;

			Lead.findOne({'company': companyName}).exec(function(err, lead){

				if(!err){

					if(!lead){
						notFoundCallback(companyName);
					}else{
						foundCallBack(lead);
					}

				}else{
					return err;
				}

			});

		}else{
			return err;
		}

	});

}

AuditInteraction.prototype.addLeadAsView = function(){

	this.findLeadByCompany(
		function(lead){

			// update lead
			Lead.findOneAndUpdate(
				{"_id": lead._id}, 
				{
					$inc: {view_count: 1},
					$set: {
						date: new Date
					}
				},
				{ upsert : true },
				function(err){
					if(err){
						console.error(err);
					}
				}
			);

		},
		function(companyName){

			// add lead
			var lead = new Lead({
				company: companyName,
				date: new Date()
			});

			lead.save(function (err) {

		        if(err) {
		            return err;
		        }	

		    });

		}
	);
	
}

AuditInteraction.prototype.addLeadAsRequest = function(data, callback){
	
	this.findLeadByCompany(
		function(lead){

			Lead.findOneAndUpdate(
				{"_id": lead._id}, 
				{
					$set: {
						contact: true,
						name: data.name,
						contact_method: data.contactMethod,
						contact_value: data.contactValue
					}
				},
				{ upsert : true },
				function(err){
					if(err){
						callback(err);
					}else{
						callback();
					}
				}
			);

		}, 
		function(companyName){

			var lead = new Lead({
				company: companyName,
				date: new Date(),
				contact: true,
				name: data.name,
				contact_method: data.contactMethod,
				contact_value: data.contactValue
			});

			lead.save(function (err) {

		        if(err) {
		            callback(err);
		        }else{
		        	callback();
		        }	

		    });

		}
	);

}

module.exports = AuditInteraction;