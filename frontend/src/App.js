import './App.css';
import { Booking2 } from './Components/BookingStatus/Booking2.jsx';
import BookingTable from './Components/BookingTable/BookingTable.jsx';
import { Home } from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';

import ViewPage from './Components/ViewPage/ViewPage.jsx'

function App() {
  return(
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Booking2></Booking2>}></Route>
          <Route path="/booking" element={<Booking2></Booking2>}></Route>
          <Route path="/showbooking" element={<ViewPage></ViewPage>}></Route>
          <Route path="/editbooking" element={<BookingTable></BookingTable>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
