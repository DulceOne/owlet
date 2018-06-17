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
    console.log(req.body.newsTitle);
    var news = {
        news:req.body.newsContent,
        lowContent:req.body.newsLowContent,
        title:req.body.newsTitle,
        date:req.body.date,
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

exports.gameUpdate = function(req,res){
    var game = {
       id: req.body.id,
       descr:req.body.descr,
       img:req.body.gamesImgName
    }
    
    fileSave(req.body.data,game.img);

    admin.gameUpdate(game,function(err,result){
        if(err)
            return res.sendStatus(500);
        res.sendStatus(200);
    })
}

exports.newsDell = function(req,res){
    var id = req.body.id;
    admin.newsDell(id,function(err,result){
        if(err)
            return res.sendStatus(500)
        res.sendStatus(200);
    });
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


exports.gameDell = function(req,res){
    admin.gameDell(req.body.id,function(err,result){
        if(err)
            return res.sendStatus(500);
        res.sendStatus(200);
    })
}

function fileSave(file,name){
    var b64Data = file.split(',')[1];
	var buffer = new Buffer(b64Data,'base64');
	fs.writeFile('./image/'+name,buffer,function(e){
		if(e) console.log.error(e);
    });
}