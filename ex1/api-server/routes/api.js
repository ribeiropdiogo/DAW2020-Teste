var express = require('express');
var router = express.Router();
const Batismo = require('../controllers/batismo')

// Listar todos os batismos
router.get('/batismos', function(req, res) {
  if(req.query.ano){
    Batismo.byano(req.query.ano)
      .then(dados => res.status(200).jsonp(dados) )
      .catch(e => res.status(500).jsonp({error: e}))
  } else {
    Batismo.listar()
      .then(dados => res.status(200).jsonp(dados) )
      .catch(e => res.status(500).jsonp({error: e}))
  }
});

router.get('/batismos/batisado', function(req, res) {
  Batismo.batisado()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/batismos/progenitores', function(req, res) {
  Batismo.progenitores()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/batismos/stats', function(req, res) {
  Batismo.stats()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/batismos/:id', function(req, res) {
  Batismo.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

module.exports = router;
