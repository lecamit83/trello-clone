const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var participantSchema = new Schema({
  participants : [{
    personId : {
      type: Schema.Types.ObjectId,
      ref : 'User'
    },
    isAdmin : {
      type:  Boolean,
      default : false
    }
  }]
});

const Participant = mongoose.model('Participant', participantSchema);
module.exports = Participant;
