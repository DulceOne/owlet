var data = require('../models/data');
var fs = require('fs');

exports.getData = function(req,res){
    data.getData(function(err,result){
        if(req.isAuthenticated()){
            if(result){
                return res.render('index.ejs',{role:"admin",result:result});
            }
        }
        return res.render('index.ejs',{role:"user",result:result});
    });
}

exports.getCutNews = function(req,res){
    if(!req.params.id){
        data.getCutNews("",function(err,result,count){
            console.log("don't params")
            if(req.isAuthenticated()){
                if(result){
                    return res.render('news.ejs',{role:"admin",result:result,count:count});
                }
            }
            return res.render('news.ejs',{role:"user",result:result,count:count});
        });
    }
    else{
        console.log(req.params.id)
        data.getCutNews(req.params.id,function(err,result,count){
            if(req.isAuthenticated()){
                if(result){
                    return res.render('news.ejs',{role:"admin",result:result,count:count});
                }
            }
            return res.render('news.ejs',{role:"user",result:result,count:count});
        });
    }
}

exports.getOneNews = function(req,res){
    var id = (req.params.id ? req.params.id : req.body.id);
    data.getOneNews(id,function(err,result){
        if(req.params.id){
            if(req.isAuthenticated()){
                if(result){
                    return res.render('tidings.ejs',{role:"admin",result:result});
                }
            }
            return res.render('tidings.ejs',{role:"user",result:result});
        }
        else{
            if(req.isAuthenticated()){
                if(result){
                    return res.send({result:result});
                }
            }
            return res.render('news.ejs',{role:"user",result:result});
        }
    })
}


exports.uploadFiles= function(req,res){
    console.log(req.files.foo);
    // var files = req.
}