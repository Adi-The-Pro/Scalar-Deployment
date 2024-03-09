const Room = require('../models/roomModel');
const Booking = require('../models/bookingModel');

exports.saveBooking = async (req,res) => {
  try{
    //Save the booking into the Booking Model
    const {totalPrice:price,name:name,email:email,roomType:type,checkInDate:startDate,checkInTime:startTime,checkOutDate:endDate,checkOutTime:endTime,roomNumber:roomNumber} = req.body;
    const booking = await Booking.create({price,name,email,type,startDate,startTime,endDate,endTime,roomNumber});
    
    //Decrement the number of rooms available of the current type
    const room = await Room.findOne({roomType:type});
    room["count"] -= 1;
    await room.save();
    
    return res.status(201).json({booking});
  }
  catch(err){
    console.log(err);
    return res.status(500).json(err);
  }

}

exports.getAllBooking = async (req,res) => {
   try{
    const allBooking = await Booking.find({});
     return res.status(200).json(allBooking);
   } 
   catch(err){
    return res.status(500).json(err);
   }
}

exports.deleteBooking = async (req,res) => {
  try{
    const {id:id} = req.body;

    // Find the document before deleting
    const bookingData = await Booking.findOne({ _id: id });
    if (!bookingData) {
      return res.status(404).json({ Message: "Booking not found" });
    }
    await Booking.deleteOne({_id:id});
    console.log(bookingData);

    //Increment the number of rooms available of the current type
    const room = await Room.findOne({roomType:bookingData.type});
    room["count"] += 1;
    await room.save();


    const date = new Date();
    var startDate = date.getDate();
    var startHours = date.getHours();

    var startDateParts = bookingData.startDate.split("-");
    let startParts = bookingData.startTime.split(":");
    var endDate = startDateParts[2];
    var endHours = startParts[0];

    

    var price;
    if(bookingData.type === 'A'){
      price = 100;
    }
    if(bookingData.type === 'B'){
        price = 80;
    }
    if(bookingData.type === 'C'){
        price = 50;
    }
    
    let d = endHours - startHours;
    var ans;
    if(startHours<=endHours){
      ans = d + (endDate-startDate)*24;
    }
    else{
      ans = d + (endDate-startDate-1)*24;
    }
    //Time -> ans;
    var p = bookingData.price;

    if(ans>=48){
      return res.status(200).json({refund:p});
    }
    else if(ans<48 && ans>=24){
      return res.status(200).json({refund:p/2});
    }
    else{
      return res.status(200).json({refund:0});
    }
    
  } 
  catch(err){
    console.log(err);
    return res.status(499).json(err);
  }
}