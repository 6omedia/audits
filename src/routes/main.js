
var express = require('express');
var main = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var Audit = require('../models/audit');
var Test = require('../models/test');
var Competitor = require('../models/competitor');
var PracticeArea = require('../models/practice_area');
// var Category = require('../models/category');
var Taxonomy = require('../models/taxonomy');

var mid = require('../middleware');

main.get('/', mid.requiresLogin, function(req, res){

    const path = req.path;
    res.locals.path = path;

    // Post.find({}).sort({date: -1}).exec(function(err, posts){

    Post.find({}).sort({view_count: -1}).exec(function(err, posts){

        if(err){
            next(err);
        }else{
            res.render('index', 
                {
                    title: 'Website',
                    posts: posts
                }
            );
        }

    });

});

function getCompetitors(practiceAreas){

    // find keywords from practice areas that are the same as this audits practice areas



    // find competitors with those keywords...
    // map() 3 competitors ensuring one from each practice area is added

}

main.get('/audit/:companyslug', function(req, res, next){
  
    const companySlug = req.params.companyslug;

    var AuditInteraction = require('../helpers/leads.js');
    var auditInteraction = new AuditInteraction(companySlug);
    auditInteraction.addLeadAsView();

    Audit.findOne({'company_slug': companySlug}).exec(function(error, audit){

        if(error){
            next(error);
        }else{

            if(audit != undefined){

                let score = 0;
                let failedCount = 0;

                audit.tests.forEach(function(item, index){
                    if(item != ''){
                        score = score + 5;
                    }else{
                        failedCount++;
                    }
                });

                PracticeArea.find(
                    {
                        'name': {
                            $in: audit.practice_areas
                        }
                    }
                ).exec(function(error, practiceAreas){

                    if(error){
                        // console.log('practiceAreas error: ', error);                        
                    }else{

                        //console.log('practiceAreas: ', practiceAreas);

                        let searchVolume = 0;

                        practiceAreas.forEach(function(pa){
                            console.log(pa.search_volume);
                            searchVolume = searchVolume + pa.search_volume;
                        });

                        console.log('Search Volume: ', searchVolume);

                        Competitor.find(
                            {
                                'practice_areas': {
                                    $in: audit.practice_areas
                                },
                                'postcode': audit.postcode
                            }
                        ).limit(3).sort({score: -1}).exec(function(err, competitors){

                            if(!err){

                                // console.log('competitors ', competitors);

                                function getAvg(){

                                    let avg = 0;

                                    competitors.forEach(function(competitor){
                                        avg += competitor.score;
                                    });

                                    return Math.round(avg / competitors.length);

                                }

                                let competitorAvg = getAvg();

                                Test.find({}).sort({ $natural: 1 }).exec(function(err, tests){

                                    if(err){
                                        next();
                                    }else{

                                        res.render('audit', {
                                            title: 'Audit for ' + audit.company_name,
                                            audit: audit,
                                            searchVolume: searchVolume,
                                            competitors: competitors,
                                            competitorAvg: competitorAvg,
                                            tests: tests,
                                            score: score,
                                            failedCount: failedCount
                                        });

                                    }

                                });

                            }

                        });

                    }

                });

            }else{

                res.redirect('/login');  

            }
        
        }

    });  

});

// main.get('/thanks', function(req, res, next){

//     res.render('thanks', 
//         {
//             title: 'Thanks'
//         }
//     );

// });


// main.get('/profile', mid.requiresLogin, function(req, res, next){
//   User.findById(req.session.userId)
//     .exec(function(error, user){
//       if(error){
//         next(error);
//       }else{
//         res.render('profile', {
//           title: 'Profile',
//           fullname: user.fullname
//         });
//       }
//     });
// });

module.exports = main;