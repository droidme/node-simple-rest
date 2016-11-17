var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var heroes = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
];

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

app.use(bodyParser.json());

app.get('/tour-of-heroes/heroes', function(req, res) {
    res.json(heroes);
});

app.get('/tour-of-heroes/heroes/:id', function(req, res) {
    let id = parseInt(req.params.id);
    let hero = heroes.find(h => h.id === id);
    if (!hero) {
        res.statusCode = 404;
        res.send('No hero found!')
    } else {
        res.json(hero);
    }
});

app.post('/tour-of-heroes/heroes', function(req, res) {
    if (!req.body.hasOwnProperty('id') ||
        !req.body.hasOwnProperty('name')) {
        res.statusCode = 400;
        return res.send('Not a valid hero body');
    }

    let hero = {
        id: req.body.id,
        name: req.body.name
    };

    if (heroes.find(h => h.id === hero.id)) {
        res.statusCode = 400;
        res.send('Hero already exists !!!');
    } else {
        heroes.push(hero);
        res.json(hero);
    }

});

app.delete('/tour-of-heroes/heroes/:id', function(req, res) {
    let id = parseInt(req.params.id);
    let idx = heroes.findIndex(h => h.id === id);
    if (idx >= 0) {
        heroes.splice(idx, 1);
        res.json(heroes);
    } else {
        res.statusCode = 404;
        res.send('Hero not found!');
    }
});

app.put('/tour-of-heroes/heroes/:id', function(req, res) {
    let id = parseInt(req.params.id);
    let idx = heroes.findIndex(h => h.id === id);
    if (idx >= 0) {
        if (!req.body.hasOwnProperty('id') ||
            !req.body.hasOwnProperty('name')) {
            res.statusCode = 400;
            return res.send('Not a valid hero body');
        }
        let hero = {
            id: req.body.id,
            name: req.body.name
        };
        heroes[idx] = hero;
        res.json(hero);
    } else {
        res.statusCode = 404;
        res.send('Hero not found!');
    }
});

app.listen(3000);