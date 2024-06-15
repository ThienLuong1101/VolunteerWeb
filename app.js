var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');

const session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var logupRouter = require('./routes/logup');
var passRouter = require('./routes/posts');
var showRouter = require('./routes/show');
var removePostRouter = require('./routes/removePost');
var eventRouter = require('./routes/makeEvent');
var yourActivitiesRouter = require('./routes/yourActivities');
var removeActivityRouter = require('./routes/removeActivity');



var FBurl = require('./routes/fbURL');


var dbConnectionPool = mysql.createPool({
    host: '127.0.0.1',
    database: 'projects'
});


var app = express();



app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

function requireLogin(req, res, next) {
    console.log('Checking login...');
    console.log('Session user:', req.session.user);
    if (req.session.user && req.session.user.role === '01') {
        next();
    } else if (req.session.user && req.session.user.role === '02') {
        next();
    } else if (req.session.user && req.session.user.role === '03') {
        next();
    }
    else {
        res.redirect("/"); // Redirect to login page if not logged in
    }
}

// Middleware to check if the manager is logged in
function ManagerLogin(req, res, next) {
    console.log('Checking manager login...');
    console.log('Session user:', req.session.user);
    if (req.session.user && req.session.user.role === '02') {
        next();
    } else if (req.session.user && req.session.user.role === '03') {
        next();
    } else {
        res.redirect("/"); // Redirect to login page if not a manager
    }
}

function AdminLogin(req, res, next) {
    console.log('Checking admin login...');
    console.log('Session user:', req.session.user);
    if (req.session.user && req.session.user.role === '03') {
        next();
    } else {
        res.redirect("/"); // Redirect to login page if not an admin
    }
}

// Route for user.html, accessible to both regular users and managers

app.get('/user.html', requireLogin, (req, res) => {
    //req.session.user =
    res.sendFile(path.join(__dirname, 'public', 'user.html'));
});

// Route for manager.html, only accessible to managers
app.get('/manager.html', ManagerLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'manager.html'));
});


app.get('/admin.html', AdminLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});





app.use(function (req, res, next) {
    req.pool = dbConnectionPool;
    // req.db = db;
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', loginRouter);
app.use('/', logupRouter);
app.use('/pass-it-on', passRouter);
app.use('/pass-it-on-event', eventRouter);
app.use('/your-activities', yourActivitiesRouter);
app.use('/remove-activity', removeActivityRouter);
app.use('/', removePostRouter);



app.use('/', FBurl);

app.use('', showRouter);

module.exports = app;
