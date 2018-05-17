var admin = require('../models/admin');
var fs = require('fs');

exports.gameAdd = function(req,res){

    var game = {
        descr:req.body.gameDescr,
        link:req.body.linkStore,
        img:req.body.gameImageName
    }

    fileSave(req.body.data,game.img);

    admin.gameAdd(game,function(err,result){
        if(err)
            return res.sendStatus(500);
        res.sendStatus(200);
    })
}

exports.newsAdd = function(req,res){

    var news = {
        content:req.body.newsContent,
        lowContent:req.body.newsLowContent,
        img:req.body.newsImgName
    }

    fileSave(req.body.data,news.img);

    admin.newsAdd(news,function(err,result){
        if(err)
            return res.sendStatus(500);
        res.sendStatus(200);
    })
}

exports.newsUpdate = function(req,res){
    var news = {
       id: req.body.id,
       news:req.body.newsContent,
       newsLowContent:req.body.newsLowContent,
       img:req.body.newsImgName,
    }
    
    fileSave(req.body.data,news.img);

    admin.newsUpdate(news,function(err,result){
        if(err)
            return res.sendStatus(500);
        res.sendStatus(200);
    })
}

exports.login = function(req,res){

    var user = {
        username:req.body.username,
        password:req.body.password
    }

    admin.login(user,function(err,result){
        if(err)
            return res.sendStatus(404)
        res.sendStatus(200,user);
    });
}


function fileSave(file,name){
    var b64Data = file.split(',')[1];
	var buffer = new Buffer(b64Data,'base64');
	fs.writeFile('./image/'+name,buffer,function(e){
		if(e) console.log.error(e);
    });
}