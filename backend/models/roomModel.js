const mongoose = require('mongoose');
const {Schema} = mongoose;
const room = new Schema({
    roomType: { type: String, required: true }, 
    count: { type: Number, default: 0 } 
});
module.exports = mongoose.model('Room',room);