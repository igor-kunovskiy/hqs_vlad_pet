const mongoose = require('mongoose');

const UserCommentSchema = new mongoose.Schema(
  {
    _postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
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

module.exports = mongoose.model('UserComment', UserCommentSchema);