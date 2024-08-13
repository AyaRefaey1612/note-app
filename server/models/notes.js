const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schemaNotes = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const notes = mongoose.model("Note", schemaNotes);
module.exports = notes;
