var db = require('../db');
var ObjectID = require('mongodb').ObjectID;
exports.getData = function(cb){
    db.get().collection('news').find().toArray(function(err,data){
        db.get().collection('projects').find().toArray(function(err2,data2){
            var dataObj ={
                news:data,
                games:data2
            }
            cb(err,dataObj);
        })
    })
}

exports.getCutNews = function(cb){
    db.get().collection('news').find().toArray(function(err,doc){
        cb(err,doc);
    });
}
exports.getOneNews = function(id,cb){
    db.get().collection('news').findOne({_id:ObjectID(id)},function(err,doc){
        cb(err,doc)
    })
}