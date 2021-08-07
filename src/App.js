import './App.css';
// import fakeData from './FakeData/fakeData';
import Navbar from './Components/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Contact from './Components/Contact/Contact';
import Home from './Components/Home/Home';
import Destination from './Components/Destination/Destination';
import SignUpOrLogin from './Components/SignUpOrLogin/SignUpOrLogin';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import MegaCity from '../src/urbanCityCartoon.jpg';

export const UserContext = createContext();

function App() {
  const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedAndSignedInUser, setLoggedAndSignedInUser]}>
    <Router>
        <Switch>
          <div>
            <Navbar></Navbar>
            <div className="background img-fluid" style={{ backgroundImage: `url(${MegaCity})` }}>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/home">
              <Home></Home>
            </Route>
            <PrivateRoute path="/destination">
              <Destination></Destination>
            </PrivateRoute>
            <Route path="/contact">
              <Contact></Contact>
            </Route> 
            <Route path="/login">
              <SignUpOrLogin></SignUpOrLogin>
            </Route> 
            <PrivateRoute path="/destinationDetails/:id">
              <Destination></Destination>
            </PrivateRoute>
            <Route path="*">
                <Home></Home>
              </Route>
        </div>
        </div>
        </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
