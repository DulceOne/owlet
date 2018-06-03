var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
var fs = require('fs');
var path = require('path');
var db = require('./db');
var passport = require('./autuh');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
var session = require('express-session');

app.use(express.static(__dirname));
app.use (bodyParser.urlencoded ({
   	extended: true,
	limit: '50mb'
}));

app.use (bodyParser.json ({
   	extended: true,
	limit: '50mb'
}));
app.use(cookieParser());
app.use(session({
	secret:'da illest developer',
	resave:true,
	saveUnitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(fileUpload());

var data = require('./controllers/data');
var admin = require('./controllers/admin');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.redirect("/login");
    }
}
/////////////////GET/////////////////////
app.get('/',data.getData);

app.get('/news',data.getCutNews);

app.get('/news/:id',data.getOneNews);

app.get('/news/page/:id',data.getCutNews);

app.get('/about',function(req,res){
	res.render('about.ejs',{role:""});
});
app.get('/uploadFiles',function(req,res){
	res.render('filesUpload.ejs',{});
});
/////////////////POST/////////////////////

app.post('/getOneNews',data.getOneNews);

app.post('/gameAdd',admin.gameAdd);

app.post('/newsAdd',admin.newsAdd);

app.post('/newsUpdate',admin.newsUpdate);

app.post('/newsDell',admin.newsDell);

app.post('/uploadFiles',data.uploadFiles);



app.post('/login',passport.authenticate('local', { failureRedirect: '/login' }),function(req,res){
	res.redirect('/');
});

app.post('/logout',function(req,res){
	if(req.isAuthenticated()){
		req.logout();
		res.sendStatus(200);
	}
})

app.post('/andriot',function(req,res){
	console.log(req.body);
})
app.get('/login',function(req,res){
	res.render('login.ejs',{});
})


db.connect('mongodb://localhost:27017/dulce',function(err){
	if(err){
		return console.log(err);
	}
	app.listen(9000,function(){
		console.log("server started");
	})
});

