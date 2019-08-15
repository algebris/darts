const fs = require('fs');

const hapi = require('hapi');
const inert = require('inert');

const config = require('./config');
const service = require('./service');
// require('./config/mongo');



const GameModel = require('./models/Game.model');


const server = hapi.server({
  host: config.hostname,
  port: config.port,
});

server.route([{
  method: 'GET',
  path: '/capture',
  handler: (req, h) => {
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
  handler: async (req, h) => {
    console.log('game');
    const game = new OrderModel({});
    game = GameModel.save();
    return game;
  }
}]);

const bootUpServer = async () => {
    await server.register(inert);
    await server.start();
    console.log(`Server is running at ${server.info.uri}`)

    process.on('unhandledRejection', (err) => {
      console.log(err);
      process.exit(1);
    })
}

bootUpServer();