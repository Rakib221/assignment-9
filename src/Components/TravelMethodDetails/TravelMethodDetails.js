import React from 'react';
import { useHistory } from 'react-router-dom';

const TravelMethodDetails = (props) => {
    const {id, name, photoURL} = props.method;
    let history = useHistory();
    const handleRoute = (id)=> {
        // console.log('clicked');
        history.push(`/destinationDetails/${id}`);
    }
    // console.log(name,photoURL);
    return (
        <div  className="m-3">
            <div className="card" style={{ width: '18rem' }}>
            <img onClick={() => handleRoute(id)} src={photoURL} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h4 className="card-text text-center">{name}</h4>
                </div>
            </div>
        </div>
    );
};

export default TravelMethodDetails;