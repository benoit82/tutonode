var express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('vous êtes à l\'accueil, que puis-je pour vous ?');
})

    .get('/sous-sol', (req, res) => {
        res.setHeader('Content-Type', 'text/plain');
        res.send('vous êtes dans la cave à vin, ces bouteilles sont à moi !');
    })

    .get('/etage/:etagenum/chambre', (req, res) => {
        if (isNaN(req.params.etagenum)) {
            res.setHeader('Content-Type', 'text/plain');
            res.status(404).send('Le paramètre donné n\'est pas valide.\n' +
            'Valeur attendu : nombre.');
        } else {
            // res.setHeader('Content-Type', 'text/plain');
            // res.send('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
            res.render('chambre.ejs', {etage: req.params.etagenum});
        }
    })

    .get('/compter/:nombre', (req, res) => {
        var noms = ['Robert', 'Jacques', 'Jean-Pierre', 'Gérard','Jacky'];
        res.render('pages.ejs', {compteur: req.params.nombre, noms: noms});
    })

    .use((req, res, next) => {
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('Page introuvable.');
    });

app.listen(8080);