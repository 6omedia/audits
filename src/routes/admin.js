var express = require('express');
var admin = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var Audit = require('../models/audit');
var PostCode = require('../models/postcode');
var Test = require('../models/test');
var Competitor = require('../models/competitor');
var PracticeArea = require('../models/practice_area');
// var Category = require('../models/category');
var Taxonomy = require('../models/taxonomy');
var Lead = require('../models/lead');

var mid = require('../middleware');
var frontend = require('../middleware/frontend');

admin.get('/audits/page/:pageNum', mid.checkUserAdmin, function(req, res, next){

    mid.give_permission(req.thisUser, 'manage_posts', res, function(){

        const path = req.path;
        res.locals.path = path;

        var docsPerPage = 30;
        var pageNumber = req.params.pageNum;
        var offset = (pageNumber * docsPerPage) - docsPerPage;

        Audit.count({}, function(err, count){
            Audit.find({}).skip(offset).limit(docsPerPage).sort({date: -1}).exec(function(err, audits){

                if(err){
                    next(err);
                }else{

                    const pageinationLinks = frontend.createPaginationLinks(docsPerPage, pageNumber, '/admin/audits/page', count);

                    Audit.find({}).distinct('postcode').exec(function(err, postCodes){

                        if(err){
                            return next(err);
                        }

                        res.render('admin_audits', {
                            title: 'Posts',
                            user: req.thisUser,
                            fullname: req.thisUser.fullname,
                            audits: audits,
                            postCodes: postCodes,
                            pageinationLinks: pageinationLinks,
                            admin_script: 'audits'
                        });

                    });

                }

            });
        });

    });

});


admin.get('/audits/new', mid.checkUserAdmin, function(req, res, next){

    mid.give_permission(req.thisUser, 'manage_posts', res, function(){

    	PracticeArea.find({}).exec(function(err, areas){

    		res.render('admin_audits_new', {
	            title: 'Create New Audit',
	            practiceAreas: areas,
	            user: req.thisUser,
	            fullname: req.thisUser.fullname,
	            admin_script: 'audits'
	        });

    	});

    });

});

admin.get('/audits/:id', mid.checkUserAdmin, function(req, res, next){

    let postid = req.params.id;

    mid.give_permission(req.thisUser, 'manage_posts', res, function(){

        Audit.findOne({"_id": postid}, function(error, audit){

            if(error){
               // console.log(error);
            }else{

                PracticeArea.find({}).exec(function(err, areas){

                    if(error){
                        next(error);
                    }else{

                        res.render('admin_audits_edit', {
                            title: 'Edit Audit',
                            user: req.thisUser,
                            fullname: req.thisUser.fullname,
                            audit: audit,
                            postid: postid,
                            areas: areas,
                            admin_script: 'audits'
                        });

                    }

                });

            }

        });

    });

});



admin.get('/competitors/page/:pageNum', mid.checkUserAdmin, function(req, res, next){

    mid.give_permission(req.thisUser, 'manage_posts', res, function(){

        const path = req.path;
        res.locals.path = path;

        var docsPerPage = 30;
        var pageNumber = req.params.pageNum;
        var offset = (pageNumber * docsPerPage) - docsPerPage;

        Competitor.count({}, function(err, count){
            Competitor.find({}).skip(offset).limit(docsPerPage).sort({date: -1}).exec(function(err, competitors){

                if(err){
                    next(err);
                }else{

                    const pageinationLinks = frontend.createPaginationLinks(docsPerPage, pageNumber, '/admin/competitors/page', count);

                    res.render('admin_competitors', {
                        title: 'Competitors',
                        user: req.thisUser,
                        fullname: req.thisUser.fullname,
                        competitors: competitors,
                        pageinationLinks: pageinationLinks,
                        admin_script: 'competitors'
                    });
                }

            });
        });

    });

});


admin.get('/competitors/new', mid.checkUserAdmin, function(req, res, next){

    mid.give_permission(req.thisUser, 'manage_posts', res, function(){

        PracticeArea.find({}).exec(function(err, areas){

            res.render('admin_competitors_new', {
                title: 'Create New Competitor',
                user: req.thisUser,
                fullname: req.thisUser.fullname,
                practiceAreas: areas,
                admin_script: 'competitors'
            });

        });

    });

});

admin.get('/competitors/:id', mid.checkUserAdmin, function(req, res, next){

    let postid = req.params.id;

    mid.give_permission(req.thisUser, 'manage_posts', res, function(){

        Competitor.findOne({"_id": postid}, function(error, competitor){

            if(error){
               // console.log(error);
            }else{

                PracticeArea.find({}).exec(function(error, areas){

                    if(error){
                        next(error);
                    }else{

                        res.render('admin_competitors_edit', {
                            title: 'Edit Competitor',
                            user: req.thisUser,
                            fullname: req.thisUser.fullname,
                            competitor: competitor,
                            areas: areas,
                            postid: postid,
                            admin_script: 'competitors'
                        });

                    }

                });

            }

        });

    });

});

admin.get('/tests', mid.checkUserAdmin, function(req, res, next){

    mid.give_permission(req.thisUser, 'manage_posts', res, function(){

        Test.find({}).sort({ $natural: 1 }).exec(function(err, tests){

            if(err){
                next(err);
            }else{

                res.render('admin_tests', {
                    title: 'Tests',
                    user: req.thisUser,
                    fullname: req.thisUser.fullname,
                    tests: tests,
                    admin_script: 'tests'
                });

            }

        });

    });

});

admin.get('/leads/page/:pageNum', mid.checkUserAdmin, function(req, res, next){

    mid.give_permission(req.thisUser, 'manage_posts', res, function(){

        var docsPerPage = 30;
        var pageNumber = req.params.pageNum;
        var offset = (pageNumber * docsPerPage) - docsPerPage;

        Lead.count({}, function(err, count){
            Lead.find({}).skip(offset).limit(docsPerPage).sort({ $natural: 1 }).exec(function(err, leads){

                const pageinationLinks = frontend.createPaginationLinks(docsPerPage, pageNumber, '/admin/leads/page', count);

                if(err){
                    next(err);
                }else{

                    res.render('admin_leads', {
                        title: 'Tests',
                        user: req.thisUser,
                        fullname: req.thisUser.fullname,
                        leads: leads,
                        admin_script: 'leads',
                        pageinationLinks: pageinationLinks
                    });

                }

            });
        });

    });

});

module.exports = admin;


