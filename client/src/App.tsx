import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './screens/Home';
import Welcome from './screens/Welcome';
import Appointments from './screens/Appointments';
import Unauth from "./screens/Unauth";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookappointments" element = {<Welcome />} />
        <Route path='/myappointments' element = {<Appointments />} />
        <Route path='/unauthorized-user' element = {<Unauth />} />
      </Routes>
    </Router>
  );
}

export default App;
