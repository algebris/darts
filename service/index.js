const _ = require('lodash');
const { execSync } = require('child_process');
const NodeWebcam = require( "node-webcam" );
const GameModel = require('../models/Game.model');

const imageCapture = async () => {
  execSync(`imagesnap -d 'Logitech Camera' /tmp/capture.jpeg > /dev/null`);
};

const nodeWebcam = async () => {
  const Webcam = await NodeWebcam.create();
  return new Promise((resolve, reject) =>
    Webcam.capture( "capture", ( err, data ) => 
      err ? reject(err) : resolve(data)
    )
  );
};

const shotController = async(req, h) => {
  const gameId = _.get(req, 'server.app.currentGame');
  if(!gameId) {
    return h.notFound('No opened games');
  }
  
  const game = await GameModel.findById(gameId);
  
  if(!game) {
    return h.notFound('Game record broken');
  }

  if(!_.isNumber(req.payload.points)) {
    return h.badRequest('No points applied');
  }
  
  const coords = _.get(req.payload, 'coords');
  const points = _.get(req.payload, 'points');

  game.shots.push({
    points,
    coords,
  });
  await game.save();

  return { ok: 1 }
};

const startGame = async(req, h) => {
  if(!req.server.app.currentGame) {
    const game = new GameModel({});
    game.save();
    req.server.app.currentGame = _.get(game, '_id');
  }
  return { id: req.server.app.currentGame };
};

const finishGame = async(req, h) => {
  const gameId = _.get(req, 'server.app.currentGame');
  if(!gameId) {
    return h.notFound('No opened games');
  }
  const game = await GameModel.findById(gameId);
  delete(req.server.app.currentGame)
  return { ok: 1 };
};

module.exports = {
  imageCapture,
  nodeWebcam,
  shotController,
  startGame,
  finishGame
};