import React from 'react';
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "react-google-maps";
import Map from './Map.png';
const GoogleMap = () => {
    // const style = {
    //     maxWidth: "500px",
    //     height: "650px",
    //     overflowX: "hidden",
    //     overflowY: "hidden"
    // };
    // const containerStyle = {
    //     maxWidth: "500px%",
    //     height: "550px"
    // };
    return (
        <div>
            <img src={Map} alt="" srcset="" />
            {/* <Map style={style} containerStyle={containerStyle} google={this.props.google} zoom={15}>

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                </InfoWindow>
            </Map> */}
        </div>
    );
};
export default
    // GoogleApiWrapper({ apiKey: 'AIzaSyDYFKlLMeidbSvOW9ZGa9Me8f0sjaOrW38' })
        (GoogleMap);