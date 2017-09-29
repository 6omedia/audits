
var express = require('express');
var api = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var Audit = require('../models/audit');
var Test = require('../models/test');
var Competitor = require('../models/competitor');
var Taxonomy = require('../models/taxonomy');
var Lead = require('../models/lead');

var mid = require('../middleware');

api.post('/add_audit', mid.checkUserAdmin, function(req, res, next){

    let data = {};
    data.success = '0';

    const audit = new Audit(
        {
			company_name: req.body.company_name,
            company_slug: req.body.company_slug,
			company_website: req.body.company_website,
            postcode: req.body.postcode,
			practice_areas: JSON.parse(req.body.practice_areas),
			screenshot: req.body.screenshot,
			tests: JSON.parse(req.body.tests)
		}
    );

    //save model to MongoDB
    audit.save(function (err) {

        if(err) {
            data.error = err;
            res.send(data);
        }else{
            data.success = '1';
            res.send(data);
        }

    });

});

api.post('/update_audit', mid.checkUserAdmin, function(req, res, next){

    let data = {};
    data.success = '0';
    const postid = req.body.postid;

    Audit.update(
        {
        "_id": postid
        }, 
        {
            $set: {
                company_name: req.body.company_name,
                company_slug: req.body.company_slug,
                company_website: req.body.company_website,
                postcode: req.body.postcode,
				practice_areas: JSON.parse(req.body.practice_areas),
				screenshot: req.body.screenshot,
				tests: JSON.parse(req.body.tests)
            }
        },
        function(err, affected, resp){
            if(err){
                data.error = err;
                res.send(data);
            }else{
                data.success = '1';
                res.send(data);
            }
        }
    );

});

api.post('/add_competitor', mid.checkUserAdmin, function(req, res, next){

    let data = {};
    data.success = '0';

    const competitor = new Competitor(
        {
            company_name: req.body.company_name,
            company_website: req.body.company_website,
            postcode: req.body.postcode,
            practice_areas: JSON.parse(req.body.practice_areas),
            tests: JSON.parse(req.body.tests),
            score: req.body.score
        }
    );

    //save model to MongoDB
    competitor.save(function (err) {

        if(err) {
            data.error = err;
            res.send(data);
        }else{
            data.success = '1';
            res.send(data);
        }

    });

});

api.post('/update_competitor', mid.checkUserAdmin, function(req, res, next){

    let data = {};
    data.success = '0';
    const postid = req.body.postid;

    Competitor.update(
        {
            "_id": postid
        }, 
        {
            $set: {
                company_name: req.body.company_name,
                company_website: req.body.company_website,
                postcode: req.body.postcode,
                practice_areas: JSON.parse(req.body.practice_areas),
                tests: JSON.parse(req.body.tests),
                score: req.body.score
            }
        },
        function(err, affected, resp){
            if(err){
                data.error = err;
                res.send(data);
            }else{
                data.success = '1';
                res.send(data);
            }
        }
    );

});

api.post('/add_test', mid.checkUserAdmin, function(req, res, next){

    let data = {};
    data.success = '0';

    const test = new Test(
        {
            short: req.body.short,
            question: req.body.question,
            help: req.body.help,
            helpImg: req.body.helpImg
        }
    );

    //save model to MongoDB
    test.save(function(err) {

        if(err) {
            data.error = err;
            res.send(data);
        }else{

            Test.find({}).sort( { $natural: 1 } ).exec(function(err, tests){

                data.success = '1';
                data.tests = tests;
                res.send(data);
            
            });
        }

    });

});

api.post('/update_test', mid.checkUserAdmin, function(req, res, next){

    let data = {};
    data.success = '0';
    const postid = req.body.testId;

    Test.update(
        {
            "_id": postid
        }, 
        {
            $set: {
                short: req.body.short,
                question: req.body.question,
                help: req.body.help,
                helpImg: req.body.helpImg
            }
        },
        function(err, affected, resp){
            if(err){
                data.error = err;
                res.send(data);
            }else{

                Test.find({}).sort({ $natural: 1 }).exec(function(err, tests){

                    if(err){
                        data.error = err;
                        res.send(data);
                    }else{

                        data.success = '1';
                        data.tests = tests;
                        res.send(data);
                    }

                });

            }
        }
    );

});

api.post('/contact-request', function(req, res, next){

    let data = {};
    data.success = '0';

    if(req.body.name == ''){
        data.error = 'Name Empty';
        return res.send(data);
    }

    if(req.body.contactValue == ''){
        data.error = 'Value Empty';
        return res.send(data);
    }

    var AuditInteraction = require('../helpers/leads.js');
    var auditInteraction = new AuditInteraction(req.body.company);

    auditInteraction.addLeadAsRequest(req.body, function(err){

        if(!err){
            data.success = '1';
            res.send(data);
        }else{
            data.error = err;
            res.send(data);
        }
        
    });

    // add to db
    // var lead = new Lead({
    //     company: req.body.company,
    //     name: req.body.name,
    //     contact_method: req.body.contactMethod,
    //     contact_value: req.body.contactValue
    // });

    // lead.save(function(err) {

    //     if(err) {
    //         data.error = err;
    //         res.send(data);
    //     }else{
    //         data.success = '1';
    //         res.send(data);
    //     }

    // });

});

api.post('/remove-lead', function(req, res, next){

    let data = {};
    data.success = '0';

    Lead.remove({ "_id" : req.body.leadId }, function(err){
        
        if(err){
            data.error = err;
            res.send(data);
        }else{

            Lead.find({}).exec(function(err, leads){

                if(err){

                    data.error = err;
                    res.send(data);

                }else{

                    data.success = '1';
                    data.leads = leads;
                    res.send(data);

                }

            });

        }

    });

});

module.exports = api;