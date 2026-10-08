const express = require('express');
const router = express.Router();
const Artista = require('../models/artista.model');
const Filme = require('../models/filme.model');

router.get('/', async (req, res) => {
  const artistas = await Artista.findAll({
    include: { model: Filme, as: 'filmes' },
    order: [['nome', 'ASC']]
  });
  res.render('artistas/listar', { artistas });
});

router.get('/cadastrar', (req, res) => {
  res.render('artistas/cadastrar');
});

router.post('/cadastrar', async (req, res) => {
  await Artista.create({
    nome: req.body.nome,
    anoNascimento: req.body.anoNascimento,
    foto: req.body.foto,
    nomeArtistico: req.body.nomeArtistico,
    tecnicasAtuacao: req.body.tecnicasAtuacao,
    emAtividade: req.body.emAtividade === 'true'
  });
  res.redirect('/artistas');
});

router.get('/detalhar/:id', async (req, res) => {
  const artista = await Artista.findByPk(req.params.id, {
    include: { model: Filme, as: 'filmes' }
  });
  if (!artista) return res.status(404).send('Artista não encontrado.');
  res.render('artistas/detalhar', { artista });
});

router.get('/editar/:id', async (req, res) => {
  const artista = await Artista.findByPk(req.params.id);
  if (!artista) return res.status(404).send('Artista não encontrado.');
  res.render('artistas/editar', { artista });
});

router.put('/editar/:id', async (req, res) => {
  const artista = await Artista.findByPk(req.params.id);
  if (!artista) return res.status(404).send('Artista não encontrado.');

  await artista.update({
    nome: req.body.nome,
    anoNascimento: req.body.anoNascimento,
    foto: req.body.foto,
    nomeArtistico: req.body.nomeArtistico,
    tecnicasAtuacao: req.body.tecnicasAtuacao,
    emAtividade: req.body.emAtividade === 'true'
  });
  res.redirect(`/artistas/detalhar/${artista.id}`);
});

router.delete('/excluir/:id', async (req, res) => {
  const artista = await Artista.findByPk(req.params.id);
  if (artista) await artista.destroy();
  res.redirect('/artistas');
});

module.exports = router;