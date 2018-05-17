var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

var user = {
    login:"admin",
    password:"admin"
}

passport.use(new LocalStrategy(function(username,password,done){
	console.log(username + ":" + password)
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
module.exports = passport;