var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var express = require('express');
var app = express();

app.use(cookieSession({
    name: 'session',
    keys: ['secret']
}));

app.use((req, res, next) => {
    if (typeof (req.session.tasks) == 'undefined') {
        req.session.tasks = [];
    }
    next();
});

app.post('/add', urlencodedParser, (req,res) => {
    if (req.body.task && req.body.task.length > 0) {
        req.session.tasks.push(req.body.task);
    }
    res.redirect('/');

});

app.get('/delete/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
        req.session.tasks.splice(req.params.id, 1);
    }
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.render('todolist.ejs', { tasks: req.session.tasks });
});

app.listen(8080);