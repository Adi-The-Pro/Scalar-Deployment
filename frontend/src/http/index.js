import axios from 'axios';
export const submitBooking = async (name,email,roomType,checkInDate,checkInTime,checkOutTime,checkOutDate,roomNumber,totalPrice) => {
    console.log(name,email,roomType,checkInDate,checkInTime,checkOutTime,checkOutDate,roomNumber,totalPrice);
    const res = await axios.post("/bookingInfo",{name,email,roomType,checkInDate,checkInTime,checkOutTime,checkOutDate,roomNumber,totalPrice});
    
    if(res.status !== 201){
        throw new Error('Unable to Submit Booking');
    }
    const data = await res.data;
    return data;
}

export const getAllBookings = async() =>{
    const res = await axios.get("/getAllBookings"); 
    if(res.status !== 200){
        throw new Error('Unable to Fetch All Bookings');
    }
    const data = await res.data;
    return data;
}

export const deleteBooking = async (id) => { 
    console.log(id);
    const res = await axios.post('/deleteBooking',{id:id});
    console.log(res);
    if(res.status !== 200){
        throw new Error('Unable to Delete Booking');
    }
    const data = await res.data;
    return data;
}



export const filter = async (query) =>{
    console.log(query);
    const res = await axios.post('/filter',query);
    if(res.status !== 200){
        throw new Error('Unable to Filter');
    }
    const data = res.data;
    return data;
}