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
    personId : {
      type : Schema.Types.ObjectId,
      ref : 'User'
    },
    isAdmin : {
      type : Boolean, 
      default : false,
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
