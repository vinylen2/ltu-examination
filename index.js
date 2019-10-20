const Koa = require('koa');
const router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

const config = require ('./config.json');
const epokModels = require('./epokModels');
const idealModels = require('./idealModels');


const app = new Koa();

app.use(bodyParser());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
  allowMethods: ['GET', 'PATCH', 'POST'],
  allowHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

const epok = require('./routes/epok.js');
const ideal = require('./routes/ideal.js');

app.listen(config.port);

//Creates database connection
epokModels.connection.sync().then(() => {
  console.log(`Server listening on port: ${config.port}`);
  console.log('Sequelize synchronized');
  app.use(epok.routes());
});

idealModels.connection.sync({alter: true}).then(() => {
  console.log(`Server listening on port: ${config.port}`);
  app.use(ideal.routes());
});