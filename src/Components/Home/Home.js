import React, { useState } from 'react';
import vehicles from '../../FakeData/Data';
import './Home.css';
import TravelMethodDetails from '../TravelMethodDetails/TravelMethodDetails';

const Home = () => {
    const [travelMethod, setTravelMethod] = useState(vehicles);

    // console.log(travelMethod);
    return (
        <div className='displayGrid background'>
            {
                travelMethod.map(method => <TravelMethodDetails key={method.id} method = {method}></TravelMethodDetails>)
            }
        </div>
    );
};

export default Home;