import React, { useState ,useEffect} from 'react';
import './BookingTable.css';
import { deleteBooking, getAllBookings } from '../../http';
import {toast} from 'react-hot-toast'

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    const finalData = async () => {
      const data =  await getAllBookings();
      setBookings(data);
    }
    finalData();
  },[setBookings,getAllBookings]);

  const handleEdit = (bookingId) => {
    console.log(`Edit booking with ID ${bookingId}`);
  };

  const handleDelete = async (bookingId) => {
    try{
      toast.loading("Deleting Booking",{id:"deletion"});
      const data  = await deleteBooking(bookingId);
      console.log(data);
      window.alert(`Refund of ${data.refund} is initiated`);
      setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
      toast.success("Booking Deleted",{id:"deletion"});
    }
    catch(err){
      toast.error("Error",{id:"deletion"});
    }
  };

  return (
    <div className='container'>
      <div className="tableContainer">
        <table className='tableClass'>
            <thead className='tableHead'>
            <tr>
              <th>User Details</th>
              <th>Room Details</th>
              <th>Booking Details</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody className='tableBody'>
            {bookings.map(booking => (
                <tr key={booking._id} className='tableRow'>
                  <td>{booking.name} <br/> {booking.email}</td>
                  <td>{booking.type} <br/> {booking.roomNumber} <br/> ${booking.price}</td>
                  <td>Start Date - {booking.startDate} <br/> 
                    Start Time - {booking.startTime} <br/> 
                    End Date - {booking.endDate} <br/> 
                    End Time - {booking.endTime}
                  </td>
                  <td>
                    <div className="submitContainer">
                      <div className="editButtons" onClick={() => handleEdit(booking._id)}>
                        Edit
                      </div>
                      <div className="editButtons" onClick={() => handleDelete(booking._id)}>
                        Delete
                      </div>
                    </div>
                  </td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;
