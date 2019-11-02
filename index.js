// library to create REST APIs in Node
const Koa = require('koa');

// used to parse body repsonses from API
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

// loads config file for DB-connections and port
const config = require ('./config.json');

// models
const epokModels = require('./epokModels');
const idealModels = require('./idealModels');
const ladokModels = require('./ladokModels');

// creates an instance of the API
const app = new Koa();

// uses bodyParser-lib
app.use(bodyParser());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
  allowMethods: ['GET', 'PATCH', 'POST'],
  allowHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

// routes
const epok = require('./routes/epok.js');
const ideal = require('./routes/ideal.js');
const ladok = require('./routes/ladok.js');

app.listen(config.port);

//Creates database connection
epokModels.connection.sync().then(() => {
  console.log(`Server listening on port: ${config.port}`);
  app.use(epok.routes());
});

idealModels.connection.sync().then(() => {
  console.log(`Server listening on port: ${config.port}`);
  app.use(ideal.routes());
});

ladokModels.connection.sync().then(() => {
  console.log(`Server listening on port: ${config.port}`);
  app.use(ladok.routes());
});