const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoordsSchema = new Schema({
  x: Number,
  y: Number
}, { _id: false, versionKey: false });

const ShotSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  points: Number,
  multiplier: Number,
  coords: CoordsSchema,
  image: String,
}, { _id: false, timestamps: true, versionKey: false });

const GameSchema = new Schema({
  shots: [ShotSchema]
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Game', GameSchema);