const _ = require('lodash');
const fs = require('fs');

const hapi = require('hapi');
const Inert = require('inert');
const HapiSwagger = require('hapi-swagger');
const hapiBoomDecorators = require('hapi-boom-decorators');

const config = require('./config');
const service = require('./service');
require('./config/mongo');

const GameModel = require('./models/Game.model');

const server = hapi.server({
  host: config.hostname,
  port: config.port,
});

server.route([{
  method: 'GET',
  path: '/capture',
  handler: async (req, h) => {
    const data = await service.nodeWebcam();
    const date = new Date();
    const stream = fs.createReadStream(data);
    
    console.log(`${date.toString()} - Hit the point`);
    
    return h.response(stream)
      .type('image/jpeg');
  }
}, {
  method: 'POST',
  path: '/game',
  handler: service.startGame
},
{
  method: 'POST',
  path: '/game/end',
  handler: service.finishGame
},
{
  method: 'PUT',
  path: '/shot',
  config: {
    handler: service.shotController,
    payload: {
      output: 'data',
      parse:true
    }
  }
}]);

const bootUpServer = async () => {
    await server.register([
      Inert,
      hapiBoomDecorators
    ]);
    await server.start();
    console.log(`Server is running at ${server.info.uri}`)

    process.on('unhandledRejection', (err) => {
      console.log(err);
      process.exit(1);
    })
}

bootUpServer();