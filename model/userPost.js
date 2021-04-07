const mongoose = require('mongoose');

const UserPostSchema = new mongoose.Schema(
  {
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('UserPost', UserPostSchema);