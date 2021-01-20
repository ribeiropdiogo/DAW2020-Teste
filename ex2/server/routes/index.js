var express = require('express');
var router = express.Router();
var axios = require('axios');
var token = "";

axios.post('http://clav-api.di.uminho.pt/v2/users/login', { username: "daw2020@teste.uminho.pt", password: "232" })
  .then(t => token = t.data.token)
  .catch(e => console.log(e));

router.get('/', function(req, res, next) {
  res.render('index', {title: "Teste DAW"});
});

router.get('/classes', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&estrutura=lista&token=' + token)
    .then(dados => res.render('classes', {title: "Classes Nível 1", classes: dados.data }))
    .catch(e => res.render('error', {error: e}));
});

router.get('/classes/:id', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + req.params.id + '?token=' + token)
    .then(dados => {
      if(dados.data.nivel == 3){
        axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + req.params.id + '/ti?token=' + token)
          .then(ti => {
            res.render('classe', {title: "Classe " + dados.data.codigo, classe: dados.data, termosIndice: ti.data  })
          })
      } else {
        res.render('classe', {title: "Classe " + dados.data.codigo, classe: dados.data })
      }
    })
    .catch(e => res.render('error', {error: e}));
});

router.get('/ti', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token=' + token)
    .then(dados => res.render('ti', {title: "Termos de Índice", ti: dados.data }))
    .catch(e => res.render('error', {error: e}));
});

module.exports = router;
