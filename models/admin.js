var db = require('../db');
var ObjectID = require('mongodb').ObjectID;
exports.gameAdd = function(game,cb){
    db.get().collection('projects').insert({
        descr:game.descr,
        link:game.link,
        img:game.img
    },function(err,result){
        cb(err,result);
    });
}

exports.newsAdd = function(news,cb){
    db.get().collection('news').insert({
        content:news.content,
        lowContent:news.lowContent,
        img:news.img
    },function(err,result){
        cb(err,result);
    });
}

exports.newsUpdate = function(news,cb){
    db.get().collection('news').update({_id:ObjectID(news.id)},{$set:{
        news:news.news,
        lowContent:news.newsLowContent,
        img:news.img
    }},function(err,doc){
        console.log(doc)
        cb(err,doc);
    })
}

exports.newsDell = function(id,cb){
    db.get().collection('news').remove({_id:ObjectID(id)},function(err,res){
        cb(err,res);
    });
}

exports.login = function(user,cb){
    var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(function(username,password,done){
        console.log("work1");
        console.log(username,password);
        if(username == user.login && password == user.password){
            return done(null,{username:'admin'});
        }
        return done(null,false);
    }));

    passport.serializeUser(function(user,done){
        done(null,user.username);
    });

    passport.deserializeUser(function(username,done){
        done(null,{username:username});
    });
}
