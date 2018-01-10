var express               = require("express"),
    app                   = express(),
    flash                 = require("connect-flash"),
    mongoose              = require("mongoose"),
    bodyParser            = require("body-parser"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user.js");

mongoose.connect("mongodb://localhost/kitapp");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "Gowty did th app",
    resave: false,
    saveUninitialized: false
  })
);

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/dashboard",isLoggedIn, function(req, res) {
  res.render("dashboard");
});

// Authentication
// create admin
app.post("/adminregister", function(req, res) {
  req.body.username
  req.body.firstname
  req.body.lastname
  req.body.code
  req.body.password

  User.register(new User({username:req.body.username,firstname:req.body.firstname,lastname:req.body.lastname,code:req.body.code}),req.body.password,function(err,user){
    if(err){
      console.log(err);
      res.redirect("/");
    }
      passport.authenticate("local")(req,res,function(){
        req.flash("success", "You are Registered and now can LogIn");
        res.redirect("/");
      });
  });
});

// admin login & logout
app.post("/adminlogin",passport.authenticate("local",{
  successRedirect : "/dashboard",
  failureRedirect : "/"
}), function(req, res) {
});

app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/");
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
}


var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("SERVER STARTED AT PORT 5000");
});
