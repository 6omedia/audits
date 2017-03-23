
var express = require('express');
var api = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var Audit = require('../models/audit');
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

module.exports = api;