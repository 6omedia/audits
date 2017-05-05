
var express = require('express');
var api = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var Audit = require('../models/audit');
var Test = require('../models/test');
var Competitor = require('../models/competitor');
// var Category = require('../models/category');
var Taxonomy = require('../models/taxonomy');

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
            question: req.body.question,
            help: req.body.help,
            helpImg: req.body.helpImg,
            short: req.body.short
        }
    );

    //save model to MongoDB
    test.save(function(err) {

        if(err) {
            data.error = err;
            res.send(data);
        }else{

            Test.find({}).exec(function(err, tests){

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
                question: req.body.question,
                help: req.body.help,
                helpImg: req.body.helpImg,
                short: req.body.short
            }
        },
        function(err, affected, resp){
            if(err){
                data.error = err;
                res.send(data);
            }else{

                Test.find({}).exec(function(err, tests){

                    if(err){
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

module.exports = api;