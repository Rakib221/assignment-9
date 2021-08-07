import React from 'react';
import defaultPicture from './liberated-wheel.png';
import { MdSupervisorAccount } from 'react-icons/md';

const TravelSelection = (props) => {
    console.log(props);
    return (
        <div className="m-2 p-1 border rounded" style={{backgroundColor:'white'}}>
        <img src={props.findTravelMethod?.photoURL || defaultPicture} style={{width:'40px', marginRight:'10px' }} alt="" srcset="" />
        <span  style={{marginRight:'10px' }}>{props.findTravelMethod?.name || 'Car'}</span>
        <MdSupervisorAccount size = {30} /> 
        <span className ="fs-4">{props.findTravelMethod?.passengers || '4'}</span>
        <span style={{ marginLeft:'40px' }} className ="fs-4">{props.findTravelMethod?.cost ||'$400'}</span>
        </div>
    );
};

export default TravelSelection;