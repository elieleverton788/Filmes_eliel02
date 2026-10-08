const express = require('express');
const router = express.Router();
const FichaTecnica = require('../models/fichaTecnica.model');
const Filme = require('../models/filme.model');

router.get('/', async (req, res) => {
  const fichas = await FichaTecnica.findAll({
    include: { model: Filme, as: 'filme' },
    order: [['id', 'DESC']]
  });
  res.render('fichas/listar', { fichas });
});

router.get('/cadastrar', async (req, res) => {
  const filmes = await Filme.findAll({ order: [['titulo', 'ASC']] });
  res.render('fichas/cadastrar', { filmes });
});

router.post('/cadastrar', async (req, res) => {
  await FichaTecnica.create({
    FilmeId: req.body.FilmeId,
    duracao: req.body.duracao,
    orcamento: req.body.orcamento,
    bilheteria: req.body.bilheteria
  });
  res.redirect('/fichas');
});

router.get('/detalhar/:id', async (req, res) => {
  const ficha = await FichaTecnica.findByPk(req.params.id, {
    include: { model: Filme, as: 'filme' }
  });
  if (!ficha) return res.status(404).send('Ficha técnica não encontrada.');
  res.render('fichas/detalhar', { ficha });
});

router.get('/editar/:id', async (req, res) => {
  const ficha = await FichaTecnica.findByPk(req.params.id, {
    include: { model: Filme, as: 'filme' }
  });
  const filmes = await Filme.findAll({ order: [['titulo', 'ASC']] });
  if (!ficha) return res.status(404).send('Ficha técnica não encontrada.');
  res.render('fichas/editar', { ficha, filmes });
});

router.put('/editar/:id', async (req, res) => {
  const ficha = await FichaTecnica.findByPk(req.params.id);
  if (!ficha) return res.status(404).send('Ficha técnica não encontrada.');

  await ficha.update({
    FilmeId: req.body.FilmeId,
    duracao: req.body.duracao,
    orcamento: req.body.orcamento,
    bilheteria: req.body.bilheteria
  });
  res.redirect(`/fichas/detalhar/${ficha.id}`);
});

router.delete('/excluir/:id', async (req, res) => {
  const ficha = await FichaTecnica.findByPk(req.params.id);
  if (ficha) await ficha.destroy();
  res.redirect('/fichas');
});

module.exports = router;