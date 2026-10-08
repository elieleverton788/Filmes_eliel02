const express = require('express');
const router = express.Router();

const Filme = require('../models/filme.model');
const Diretor = require('../models/diretor.model');
const Artista = require('../models/artista.model');
const FichaTecnica = require('../models/fichaTecnica.model');

const includeCompleto = [
  { model: Diretor, as: 'diretor' },
  { model: Artista, as: 'artistas' },
  { model: FichaTecnica, as: 'fichaTecnica' }
];

router.get('/', async (req, res) => {
  const filmes = await Filme.findAll({
    include: includeCompleto,
    order: [['titulo', 'ASC']]
  });
  res.render('filmes/listar', { filmes });
});

router.get('/cadastrar', async (req, res) => {
  const [diretores, artistas] = await Promise.all([
    Diretor.findAll({ order: [['nome', 'ASC']] }),
    Artista.findAll({ order: [['nome', 'ASC']] })
  ]);
  res.render('filmes/cadastrar', { diretores, artistas });
});

router.post('/cadastrar', async (req, res) => {
  const filme = await Filme.create({
    titulo: req.body.titulo,
    anoLancamento: req.body.anoLancamento,
    genero: req.body.genero,
    sinopse: req.body.sinopse,
    poster: req.body.poster,
    DiretorId: req.body.DiretorId || null
  });

  const artistaIds = Array.isArray(req.body.artistas)
    ? req.body.artistas
    : req.body.artistas
      ? [req.body.artistas]
      : [];

  if (artistaIds.length) await filme.setArtistas(artistaIds);

  await FichaTecnica.create({
    FilmeId: filme.id,
    duracao: req.body.duracao,
    orcamento: req.body.orcamento,
    bilheteria: req.body.bilheteria
  });

  res.redirect(`/filmes/detalhar/${filme.id}`);
});

router.get('/detalhar/:id', async (req, res) => {
  const filme = await Filme.findByPk(req.params.id, { include: includeCompleto });
  if (!filme) return res.status(404).send('Filme não encontrado.');
  res.render('filmes/detalhar', { filme });
});

router.get('/editar/:id', async (req, res) => {
  const filme = await Filme.findByPk(req.params.id, { include: includeCompleto });
  const [diretores, artistas] = await Promise.all([
    Diretor.findAll({ order: [['nome', 'ASC']] }),
    Artista.findAll({ order: [['nome', 'ASC']] })
  ]);
  if (!filme) return res.status(404).send('Filme não encontrado.');

  const artistaIds = filme.artistas.map(a => a.id);
  res.render('filmes/editar', { filme, diretores, artistas, artistaIds });
});

router.put('/editar/:id', async (req, res) => {
  const filme = await Filme.findByPk(req.params.id, {
    include: [{ model: FichaTecnica, as: 'fichaTecnica' }]
  });
  if (!filme) return res.status(404).send('Filme não encontrado.');

  await filme.update({
    titulo: req.body.titulo,
    anoLancamento: req.body.anoLancamento,
    genero: req.body.genero,
    sinopse: req.body.sinopse,
    poster: req.body.poster,
    DiretorId: req.body.DiretorId || null
  });

  const artistaIds = Array.isArray(req.body.artistas)
    ? req.body.artistas
    : req.body.artistas
      ? [req.body.artistas]
      : [];

  await filme.setArtistas(artistaIds);

  if (filme.fichaTecnica) {
    await filme.fichaTecnica.update({
      duracao: req.body.duracao,
      orcamento: req.body.orcamento,
      bilheteria: req.body.bilheteria
    });
  } else {
    await FichaTecnica.create({
      FilmeId: filme.id,
      duracao: req.body.duracao,
      orcamento: req.body.orcamento,
      bilheteria: req.body.bilheteria
    });
  }

  res.redirect(`/filmes/detalhar/${filme.id}`);
});

router.delete('/excluir/:id', async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);
  if (filme) await filme.destroy();
  res.redirect('/filmes');
});

module.exports = router;