const Room = require('../models/roomModel');
const Booking = require('../models/bookingModel');

module.exports = async (req,res,next) => {
    try{
        console.log(req.body);
        const {roomNumber:roomNumber,roomType:type,checkInDate:startDate,checkInTime:startTime,checkOutDate:endDate,checkOutTime:endTime} = req.body;

        const roomAvailable = await Room.findOne({roomType:type});
        if(roomAvailable.count<=0){
            return res.status(500).json({message:"Room Not Available"});
        }

        const chck = await Booking.countDocuments();
        if(chck===0){
            next();
        }
        else{
            console.log(startDate,endDate,startTime,endTime);
            const overlappingDates = await Booking.find({
                type: type,
                roomNumber:roomNumber,
                $or: [
                    { startDate: { $lte: startDate }, endDate: { $gte: startDate } },
                    { startDate: { $lte: endDate }, endDate: { $gte: endDate } }
                ]
            });
            console.log(overlappingDates);
            //In Case There Is Overlapping In Start Date And End Date Or Both 
            if(overlappingDates.length!==0){
                console.log('Hi');
                const overlappingTime = await Booking.find({
                    type: type,
                    $or: [
                        { startTime: { $lte: startTime }, endTime: { $gte: startTime } },
                        { startTime: { $lte: endTime }, endTime: { $gte: endTime } }
                    ]
                });
                console.log(overlappingTime);
                if(overlappingTime.length==0) next();
                else return res.status(400).json({ message: "Overlapping booking for the same room" });
            }
            //In Case There Is No Overlapping In Start Date And End Date Or Both 
            else{
                next();
            }
        }
    }
    catch(err){
        console.log(err);
        return res.status(401).json({message:'ABC'});
    }
}
