const express = require('express');
const router = express.Router();
const Diretor = require('../models/diretor.model');
const Filme = require('../models/filme.model');

router.get('/', async (req, res) => {
  const diretores = await Diretor.findAll({ include: { model: Filme, as: 'filmes' }, order: [['nome', 'ASC']] });
  res.render('diretores/listar', { diretores });
});

router.get('/cadastrar', (req, res) => {
  res.render('diretores/cadastrar');
});

router.post('/cadastrar', async (req, res) => {
  await Diretor.create({
    nome: req.body.nome,
    anoNascimento: req.body.anoNascimento,
    emAtividade: req.body.emAtividade === 'true'
  });
  res.redirect('/diretores');
});

router.get('/detalhar/:id', async (req, res) => {
  const diretor = await Diretor.findByPk(req.params.id, {
    include: { model: Filme, as: 'filmes' }
  });
  if (!diretor) return res.status(404).send('Diretor não encontrado.');
  res.render('diretores/detalhar', { diretor });
});

router.get('/editar/:id', async (req, res) => {
  const diretor = await Diretor.findByPk(req.params.id);
  if (!diretor) return res.status(404).send('Diretor não encontrado.');
  res.render('diretores/editar', { diretor });
});

router.put('/editar/:id', async (req, res) => {
  const diretor = await Diretor.findByPk(req.params.id);
  if (!diretor) return res.status(404).send('Diretor não encontrado.');

  await diretor.update({
    nome: req.body.nome,
    anoNascimento: req.body.anoNascimento,
    emAtividade: req.body.emAtividade === 'true'
  });
  res.redirect(`/diretores/detalhar/${diretor.id}`);
});

router.delete('/excluir/:id', async (req, res) => {
  const diretor = await Diretor.findByPk(req.params.id);
  if (diretor) await diretor.destroy();
  res.redirect('/diretores');
});

module.exports = router;