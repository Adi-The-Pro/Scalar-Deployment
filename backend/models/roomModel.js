const mongoose = require('mongoose');
const {Schema} = mongoose;
const room = new Schema({
    roomType: { type: String, required: true }, 
    count: { type: Number, default: 0 },
    // price : {type: Number},
});
module.exports = mongoose.model('Room',room);