const mongoose = require('mongoose');
const {Schema} = mongoose;
const bookingSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    type:{
        type:String
    },
    startDate:{
        type:String
    },
    startTime:{
        type:String
    },
    endDate:{
        type:String
    },
    endTime:{
        type:String
    },
    roomNumber:{
        type:Number
    },
    price:{
        type:Number
    }
});
module.exports = mongoose.model('Booking',bookingSchema);