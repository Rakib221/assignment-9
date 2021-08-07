import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="background" style={{backgroundColor:'white'}}>
            <div className="align">
                <h4>Email: <a className="text-decoration-none" href="mailto: urban.rider@gmail.com">urban.rider@gmail.com</a></h4>
                <h4>Phone: +880 1956789432</h4>
            </div>
        </div>
    );
};

export default Contact;