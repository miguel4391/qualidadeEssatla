#!/usr/bin/env node


var express         = require("express"),
    bodyParser      = require("body-parser"),
    favicon         = require("express-favicon"),
    flash           = require("connect-flash"),
    passport        = require('passport'),
	LdapStrategy    = require('passport-ldapauth').Strategy;
    app             = express();


var indexRoutes = require("./routes/index");

var OPTS={
	server:{
		url: "ldap://192.168.10.1:389",
		bindDN:"CN=sigq,OU=UATLAusers,DC=uatla,DC=pt",
		bindCredentials:"siGq20250",
		searchBase:"OU=UATLAusers,DC=uatla,DC=pt",
		searchFilter: '(sAMAccountName={{username}})'
	}
};

var session = require("express-session");
app.use(session({
    secret: 'ldap secret',
    resave: false,
    saveUninitialized: false,
    cookie: {httpOnly:true, maxAge: 2419200000} ///maxAge in miliseconds
}));

passport.use(new LdapStrategy(OPTS));

app.use(favicon(__dirname + '/public/img/favicon.png'));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser(function(user, done){
	done(null, user);
});

passport.deserializeUser(function(user, done){
	done(null, user);
});

app.use((req, res, next) => {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);

app.listen(8086, () =>{
    console.log('Server Running on port 8086');
})
