import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Destination.css';
import FakeData from '../../FakeData/Data';
import GoogleMap from '../GoogleMap/GoogleMap';
import TravelSelection from '../TravelSelection/TravelSelection';
const Destination = () => {
    const [newDestination, setNewDestination] = useState({
        from: '',
        to: '',
        error: '',
        alert:''
    });
    const [isSearch, setIsSearch] = useState(false);
    const { id } = useParams();
    // console.log(id);
    // console.log(FakeData);
    const findTravelMethod = FakeData.find(data => data.id == id);
    // console.log(findTravelMethod.name);
    // const { photoURL, passengers, cost } = findTravelMethod;

    let isValidDestination;
    const handleBlur = (e) => {
        if (e.target.name === 'from' || e.target.name === 'to') {
            isValidDestination = /(.*[a-z]){3}/i.test(e.target.value);
            // console.log(isValidDestination);
        }
        if (isValidDestination) {
            const newDestinationUpdate = { ...newDestination };
            newDestinationUpdate[e.target.name] = e.target.value;
            newDestinationUpdate.error = '';
            newDestinationUpdate.alert = '';
            setNewDestination(newDestinationUpdate);
            // console.log(newDestination);

        }
        else {
            const newDestinationUpdateIfIsNotValidDestination = { ...newDestination };
            newDestinationUpdateIfIsNotValidDestination.error = 'Please enter at least 3 characters in both places';
            setNewDestination(newDestinationUpdateIfIsNotValidDestination);
            // console.log(newDestinationUpdateIfIsNotValidDestination);
        }
    }

    const handleSubmit = (e)=>{
        if (newDestination.from && newDestination.to) {
            setIsSearch(true);
            // console.log(isSearch);
        }
        else{
            const updateDestination = {...newDestination};
            updateDestination.alert = 'Please fill both input space';
            setNewDestination(updateDestination);
        }
        e.preventDefault();
    }

    return (
        <div className='background' style={{ backgroundColor: 'white' }}>
            <div className='row'>
                <br />
                <br />
            </div>
            <div className='row'>
                <div className='col-lg-1'>

                </div>
                <div className='col-lg-3'>
                    <div className="card" style={{ width: '18rem', backgroundColor: 'rgb(236, 232, 232)' }}>
                        {
                            !isSearch ? <div>
                                <div class="card-body">
                                    
                                    <label htmlFor="from">From</label>
                                    <br />
                                    <input style={{ width: '100%' }} onBlur={handleBlur} type="text" name="from" id="" />
                                    <label htmlFor="to">To</label>
                                    <br />
                                    <input style={{ width: '100%' }} onBlur={handleBlur} type="text" name="to" id="" />
                                    {
                                    <p className='text-center' style={{color:'red'}}>{newDestination.error}</p>
                                }
                                    <button type="button" onClick={handleSubmit} style={{ backgroundColor: 'red', color: 'white', width: '100%' }} >Search</button>
                                </div>
                                {
                                    <p className='text-center' style={{color:'red'}}>{newDestination.alert}</p>
                                }
                            </div>
                                :
                                <div>
                                    <div>
                                        <div className="m-2 p-3 border rounded" style={{ backgroundColor: 'red', color: 'white' }}>
                                            <h4>{newDestination.from}</h4>
                                            <h4>{newDestination.to}</h4>
                                        </div>
                                        <div className="m-2 p-1 border rounded" style={{backgroundColor:'white'}}>
                                            <TravelSelection findTravelMethod = {findTravelMethod}></TravelSelection>
                                            <TravelSelection findTravelMethod = {findTravelMethod}></TravelSelection>
                                            <TravelSelection findTravelMethod = {findTravelMethod}></TravelSelection>
                                        </div>
                                    </div>
                                </div>
                        }
                     </div>
                </div>
                <div className='col-lg-7'>
                    <GoogleMap></GoogleMap>
                </div>
                <div className='col-lg-1'>

                </div>
            </div>
        </div>
    );
};


export default Destination;