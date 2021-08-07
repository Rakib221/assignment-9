import React, { useContext } from 'react';
// import { Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import siteLogo from './siteLogo.png';

const Navbar = () => {
    const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
    console.log(loggedAndSignedInUser.displayName)
    return (
        <div className='row m-2'>
            <div className='col-lg-1'>

            </div>
            <div className='col-lg-3'>
                <img className="mx-5" src={siteLogo} style={{ width: '200px' }} />
            </div>
            <div className='col-lg-3'>

            </div>
            <div className='col-lg-3'>

                <nav className="mx-5 d-flex justify-content-center align-items-center">
                    <Link className="mx-3 text-decoration-none" to="home">Home</Link>
                    <Link className="mx-3 text-decoration-none" to="destination">Destination</Link>
                    <Link className="mx-3 text-decoration-none" to="blog">Blog</Link>
                    <Link className="mx-3 text-decoration-none" to="contact">Contact</Link>
                    {
                        loggedAndSignedInUser.success ? <h3>{loggedAndSignedInUser.displayName}</h3>
                            :
                            <Link to="login"><button className="bg-danger">Login</button></Link>
                    }
                </nav>
            </div>
            <div className="col-lg-1">

            </div>
        </div>
    );
};

export default Navbar;