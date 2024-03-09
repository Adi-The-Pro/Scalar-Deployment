const Booking = require('../models/bookingModel');

exports.filter = async (req, res) => {
    try {
        const { roomNumber, roomType, startTime, endTime } = req.body;
        console.log(req.body);
        const query = {};
        if (roomNumber) {
            query.roomNumber = roomNumber;
        }
        if (roomType) {
            query.type = roomType;
        }
        if (startTime && endTime) {
            query.$and = [
                { startTime: { $gte: startTime }, endTime: { $lte: endTime } }
            ];
        }
        const data = await Booking.find(query);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(err);
        return res.status(399).json({ Message: "Couldn't Filter" });
    }
};
