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

exports.getCutNews = function(id,cb){
    if(id!=""){
        if(id>1)id = (id*10)-10; else id = 10;
        db.get().collection('news').find().skip(id).sort({ $natural: -1 }).limit(10).toArray(function(err,doc){
            db.get().collection('news').count().then((count) => {
                if(count>10){
                    count+=10;
                    if(count%10!=0){
                        count = Math.floor((count/10)+1);
                    }
                }
                cb(err,doc,count);
            });
        });
    }
    else{
        db.get().collection('news').find().sort({ $natural: -1 }).limit(10).toArray(function(err,doc){
            db.get().collection('news').count().then((count) => {
                if(count>10){
                    count+=10;
                    if(count%10!=0){
                        count = Math.floor((count/10)+1);
                    }
                }
                // console.log(count)
                cb(err,doc,count); 
            });
        });
    }
}
exports.getOneNews = function(id,cb){
    db.get().collection('news').findOne({_id:ObjectID(id)},function(err,doc){
        cb(err,doc)
    })
}