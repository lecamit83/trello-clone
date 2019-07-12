const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  title : {
    type: String,
  },
  cards : [{
    card : {
      type : String,
    }
  }],
  partners : [{
    person : {
      type : Schema.Types.ObjectId,
      ref : 'User'
    }
  }],
  createdBy : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  }
}, {
  timestamps : true,
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
