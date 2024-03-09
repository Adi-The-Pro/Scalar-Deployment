const Room = require('../models/roomModel');
const mongoose = require('mongoose');
main().catch(err=>console.log(err));
async function main() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('database connection established');

        const roomA = await Room.find({roomType:'A'});
        if(roomA.length===0){
            await Room.create({roomType:'A',count:2});
        }
        const roomB = await Room.find({roomType:'B'});
        if(roomB.length===0){
            await Room.create({roomType:'B',count:3});
        }
        const roomC = await Room.find({roomType:'C'});
        if(roomC.length===0){
            await Room.create({roomType:'C',count:5});
        }
    }
    catch(err){
        console.log(err);
    }
}

