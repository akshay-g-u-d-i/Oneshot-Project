import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './screens/Home';
import Welcome from './screens/Welcome';
import Appointments from './screens/Appointments';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element = {<Welcome />} />
        <Route path='/myappointments' element = {<Appointments />} />
      </Routes>
    </Router>
  );
}

export default App;
