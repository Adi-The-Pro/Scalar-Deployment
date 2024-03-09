import React, { useState } from 'react';
import "./Booking.css";
import { submitBooking } from '../../http';
import {toast} from 'react-hot-toast'

const roomData = {
    A: { roomNumbers: [1,2], price: 100 },
    B: { roomNumbers: [1,2,3], price: 80 },
    C: { roomNumbers: [1,2,3,4,5], price: 50 },
};

export const Booking2 = () => {
    const [roomType, setRoomType] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);
    const [checkInTime, setCheckInTime] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [roomNumber, setRoomNumber] = useState(0);

    const handleRoomTypeChange = (event) => {
        setRoomType(event.target.value);
        setAvailableRooms(roomData[event.target.value]?.roomNumbers || []);
    };

    const handleCheckInTimeChange = (event) => {
        setCheckInTime(event.target.value);
    };

    const handleCheckOutTimeChange = (event) => {
        setCheckOutTime(event.target.value);
    };
    const handleCheckInDateChange = (event) => {
        setCheckInDate(event.target.value);
    };

    const handleCheckOutDateChange = (event) => {
        setCheckOutDate(event.target.value);
    };

    const handleRoomNumberChange = (event) => {
        setRoomNumber(event.target.value);
    }


    const calculateTotalPrice =  (selectedRoomType, checkInDate, checkOutDate, checkIn, checkOut) => {
        
        let startParts = checkIn.split(":");
        let endParts = checkOut.split(":");

        let startHours = parseFloat(startParts[0]);
        let endHours = parseFloat(endParts[0]);
        let endMinutes = parseFloat(endParts[1]);

        if(endMinutes !== 0){
            endHours+=1;
        }
        var d = endHours - startHours;
        
        let price = 0;
        if(selectedRoomType === 'A'){
            price = 100;
        }
        if(selectedRoomType === 'B'){
            price = 80;
        }
        if(selectedRoomType === 'C'){
            price = 50;
        }
        
        var startDateParts = checkInDate.split("-");
        var endDateParts = checkOutDate.split("-");

        var ans;
        console.log(startHours, endHours);
        if(startHours<=endHours){
            ans = d*price + (endDateParts[2] - startDateParts[2])*24*price;
        }
        else{
            ans = d*price + (endDateParts[2] - startDateParts[2] - 1)*24*price;
        }
        if(ans<0) ans=ans*-1;
        return ans;
    };

    const handleButtonClick = async (event) => {
        try{

            if(!name || !email || !roomType || !checkInDate || !checkInTime || !checkOutDate || !checkOutTime || !roomNumber){
                window.alert('Please enter all details');
                return;
            }

            if(checkInDate===checkOutDate && checkOutTime<checkInTime){
                window.alert('Check out time should be greater than Check in time');
                return;
            }

            const ans = calculateTotalPrice(roomType, checkInDate, checkOutDate,checkInTime, checkOutTime);
            toast.loading("Booking Started",{id:"booking"});
            const data = await submitBooking(name,email,roomType,checkInDate,checkInTime,checkOutTime,checkOutDate,roomNumber,ans);
            setPrice(ans);
            toast.success("Booking Confirmed",{id:"booking"});
        }
        catch(err){
            console.log(err);
            toast.error("Booking Failed",{id:"booking"});
        }
    };
    
    return (
            <div className="container1">

                <div className="header">
                    <div className="text">Book Now</div>
                    <div className="underline"></div>
                </div>

                {/* Inputs */}
                <div className="inputs">
                    <div className="input">
                        <input type="text" id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name' required />
                    </div>

                    <div className="input">
                        <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email Id' required />
                    </div>

                    <div className="input">
                        <label htmlFor="room-type">Room Type</label>
                        <select id="room-type" name="room-type" value={roomType} onChange={handleRoomTypeChange} required>
                            <option value="">Select Room Type</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </div>

                    <div className="input">
                        <label htmlFor="room-number">Select Room</label>
                        <select id="room-number" name="room-number" value={roomNumber} onChange={handleRoomNumberChange} disabled={!roomType}>
                            <option value="">-</option>
                            {roomType && (
                                availableRooms.map((roomNumber) => (
                                    <option key={roomNumber} value={roomNumber}>
                                        {roomNumber}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>

                    <div className="input time">
                        <label htmlFor="check-in-date">Check-In Date</label>
                        <input type="date" id="check-in-date" name="check-in-date" value={checkInDate} onChange={handleCheckInDateChange} placeholder='CheckInDate' required />
                    </div>

                    <div className="input time">
                        <label htmlFor="check-in-time">Check-In Time</label>
                        <input type="time" id="check-in-time" name="check-in-time" value={checkInTime} onChange={handleCheckInTimeChange} placeholder='CheckInDate'required />
                    </div>

                    <div className="input time">
                            <label htmlFor="check-out-time">Check-Out Date</label>
                            <input type="date" id="check-out-time" name="check-out-time" value={checkOutDate} onChange={handleCheckOutDateChange} required />
                    </div>

                    <div className="input time">
                        <label htmlFor="check-out-time">Check-Out Time</label>
                        <input type="time" id="check-out-time" name="check-out-time" value={checkOutTime} onChange={handleCheckOutTimeChange} required />
                    </div>
                </div>

                {/* Total Price*/}
                <div className="totalPrice">
                    <span>Total Price: ${price}</span>
                </div>

                {/* Button     */}
                <div className="submitContainer">
                    <div className="submit" onClick={handleButtonClick}>
                       Book Now
                    </div>
                </div>                   
            </div>
    );
};
