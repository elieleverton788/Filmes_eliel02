const express = require('express');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const sequelize = require('./config/bd');

const Filme = require('./models/filme.model');
const Artista = require('./models/artista.model');
const Diretor = require('./models/diretor.model');
const FichaTecnica = require('./models/fichaTecnica.model');
const FilmeArtista = require('./models/filmeArtista.model');

Diretor.hasMany(Filme, {
  foreignKey: 'DiretorId',
  as: 'filmes',
  onDelete: 'SET NULL'
});
Filme.belongsTo(Diretor, {
  foreignKey: 'DiretorId',
  as: 'diretor'
});

// Filme N:N Artista
Filme.belongsToMany(Artista, {
  through: FilmeArtista,
  foreignKey: 'FilmeId',
  otherKey: 'ArtistaId',
  as: 'artistas'
});
Artista.belongsToMany(Filme, {
  through: FilmeArtista,
  foreignKey: 'ArtistaId',
  otherKey: 'FilmeId',
  as: 'filmes'
});

// Filme 1:1 Ficha Técnica
Filme.hasOne(FichaTecnica, {
  foreignKey: 'FilmeId',
  as: 'fichaTecnica',
  onDelete: 'CASCADE'
});
FichaTecnica.belongsTo(Filme, {
  foreignKey: 'FilmeId',
  as: 'filme'
});

const app = express();

app.engine('handlebars', engine({
  defaultLayout: 'main',

  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },

  helpers: {
    eq: (a, b) => a === b,

    formatMoney: (value) =>
      Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }),

    includes: (array, value) =>
      Array.isArray(array) && array.includes(value)
  }
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Rotas
app.use('/filmes', require('./routes/filmes'));
app.use('/artistas', require('./routes/artistas'));
app.use('/diretores', require('./routes/diretores'));
app.use('/fichas', require('./routes/fichas'));

app.get('/', async (req, res) => {
  const [filmes, artistas, diretores, fichas] = await Promise.all([
    Filme.count(),
    Artista.count(),
    Diretor.count(),
    FichaTecnica.count()
  ]);

  res.render('home', { filmes, artistas, diretores, fichas });
});

async function iniciar() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Banco de dados conectado.');
    app.listen(3000, () => {
      console.log('Servidor: http://localhost:3000');
    });
  } catch (erro) {
    console.error('Erro ao iniciar:', erro);
  }
}

iniciar();