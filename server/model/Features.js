const mongoose = require("mongoose");
const { model, models, Schema } = mongoose;

const featureSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  feature_title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subReq: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  fees: {
    type: Number,
    default: 0
  },
  terms: {
    type: String,
    default: ''
  },
  members: {
    type: Number,
    default: 0
  },
  contributions: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: String,
    required: true
  }
});

module.exports = models.Features || model("Features", featureSchema);
