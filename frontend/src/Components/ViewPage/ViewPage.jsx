import React, { useState ,useEffect } from 'react';
import './ViewPage.css'

import {filter, getAllBookings} from '../../http';

const ViewPage = () => {
  const [roomType, setRoomType] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [tableData, setTableData] = useState([]);
  

  useEffect(() => {
    const finalData = async () => {
      const data =  await getAllBookings();
      setTableData(data);
    }
    finalData();
  },[setTableData,getAllBookings]);
  
  const handleFilter = async () => {
    var query = {};
    if(roomType!==''){
      query = {...query,roomType:roomType};
    }
    if(roomNumber!==''){
      
      query = {...query,roomNumber:roomNumber};
    }
    if(startTime!=='' && endTime===''){
      window.alert("Enter the End Time");
      return;
    }
    if(startTime==='' && endTime!==''){
      window.alert("Enter the Start Time");
      return;
    }
    if(startTime!=='' && endTime!==''){
      if(endTime<startTime){
        window.alert("Start Time Should Be Lesser Than Equal To The End Time");
        return;
      }
      query = {...query,startTime:startTime};
      query = {...query,endTime:endTime};
    }

    const data = await filter(query);
    console.log(data);
    setTableData(data);
  }
  
  return (
    <div className="bookingTable">
      <div className='filters'>

        <div className="roomTypeFilter">
          <span>RoomType</span>
          <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
            <option value="">Select Type</option>
            <option value="A">Type-A</option>
            <option value="B">Type-B</option>
            <option value="C">Type-C</option>
          </select>
        </div>

        <div className="roomNumberFilter">
          <span>Room Number</span>
          <select value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)}>
            <option value="">Select Room</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div className="timeFilter">
          <div className="StartTime">
            <span>Start Time</span>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div className="endTime">
            <span>End Time</span>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
        </div>

      </div>

      <div className="filterContainer">
        <div className="filterButton" onClick={handleFilter}>
          Filter
        </div>
      </div>

      <div className='container'>
        <table className='tableClass'>
          <thead className='tableHead'>
            <tr>
              <th>User Details</th>
              <th>Room Details</th>
              <th>Check-In Date and Time</th>
              <th>Check-Out Date and Time</th>
            </tr>
          </thead>
          <tbody className='tableBody'>
            {tableData.map((data) => (
              <tr key={data._id} className='tableRow'>
                <td>{data.name} <br /> {data.email}</td>
                <td>{data.type} <br /> {data.roomNumber} <br /> ${data.price}</td>
                <td>{data.startDate} <br />  {data.startTime}</td>
                <td>{data.endDate} <br /> {data.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewPage;
