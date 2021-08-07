import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { UserContext } from '../../App';
import { useContext } from 'react';
import './SignUpOrLogin.css';
import { createUserWithEmailAndPassword, handleGoogleSignIn, handleGoogleSignOut, initializeSignInAndLoginFrameWork, signInUserWithEmailAndPassword } from './SignUpOrLoginManager';
import { Link, useHistory, useLocation,  } from 'react-router-dom';

const SignUpOrLogin = () => {
    const [user, setUser] = useState({
        newUser:false,
        isSignedIn: false,
        success: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: false,
        error: '',
        alert: ''
    })

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    initializeSignInAndLoginFrameWork();

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                // console.log(res);
                setUser(res);
                setLoggedAndSignedInUser(res);
                history.replace(from);
            })
    }

    const googleSignOut = () => {
        handleGoogleSignOut()
            .then(res => {
                // console.log(res);
                setUser(res);
                setLoggedAndSignedInUser(res);
                history.replace(from);
            })
    }
    const handleBlur = (e) => {
        // console.log( e.target.name,e.target.value);
        let isValidFieldForm;
        if (e.target.name === 'name') {
            isValidFieldForm = e.target.value;
        }
        if (e.target.name === "email") {
            isValidFieldForm = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const isPasswordHasAtLeastOneNumber = /\d{1}/.test(e.target.value);
            isValidFieldForm = isPasswordValid && isPasswordHasAtLeastOneNumber;
        }
        if (e.target.name === 'confirmPassword') {
            if (user.password === e.target.value) {
                const confirmNewPassword = { ...user };
                confirmNewPassword[e.target.name] = true;
                confirmNewPassword.alert = '';
                setUser(confirmNewPassword);
            }
            else {
                const confirmNewPasswordNotMatch = { ...user };
                confirmNewPasswordNotMatch.alert = 'Password not matched';
                setUser(confirmNewPasswordNotMatch);
            }
        }

        if (isValidFieldForm) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

        const handleSubmit = (e) => {
            // console.log(user.email, user.password);
            if (user.newUser && user.email && user.confirmPassword && user.password) {
              createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    setUser(res);
                    setLoggedAndSignedInUser(res);
                    history.replace(from);
                    // console.log(res);
                })
            }
            if (!user.newUser && user.email && user.password) {
              signInUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    setUser(res);
                    setLoggedAndSignedInUser(res);
                    history.replace(from);
                    
                })
            }
            e.preventDefault();
          }

          const handleNewUser = () => {
              const handleNewUserAccount = {...user};
              handleNewUserAccount.newUser = true;
              setUser(handleNewUserAccount)
          }
          const handleLogin = () => {
            const handleOldUserAccount = {...user};
            handleOldUserAccount.newUser = false;
            setUser(handleOldUserAccount)   
          }

    const [loggedAndSignedInUser, setLoggedAndSignedInUser] = useContext(UserContext);
    return (
        <div className='background' style={{ backgroundColor: 'white' }} >
            <div className='align '>
                <div className='border p-3'>
                    {
                        !user?.newUser ?
                            <div>
                                <h4>Login</h4>
                                
                                    <input className="borderStyle" type="text" name="email" onBlur={handleBlur} placeholder="Email address" required />
                                    <br />
                                    <br />
                                    <input className="borderStyle" type="password" name="password" placeholder="Enter password" onBlur={handleBlur} required />
                                
                                <br />
                                <br />
                                <div>
                                        <input type="checkbox" name="remember" id="" />
                                        <label style={{ marginRight: '100px' }}>Remember me </label><Link style={{ color: 'orange' }} >Forgot Password</Link>
                                    </div>
                                    <br />
                                    <div className='text-center'><span>Don't have an account?</span><Link onClick={handleNewUser} href='' style={{ color: 'orange' }}>Create an account</Link></div>
                                <br />
                                <button onClick={handleSubmit} style={{ width: '100%', backgroundColor: 'orange', color: 'white' }} >Sign In</button>
                            </div>
                            :
                            <div>
                                
                                    <h4>Create an account</h4>
                                    <input className="borderStyle" type="text" name="name" onBlur={handleBlur} placeholder="Enter your user name" required />
                                    <br />
                                    <br />
                                    <input className="borderStyle" type="text" name="email" onBlur={handleBlur} placeholder="Email address" required />
                                    <br />
                                    <br />
                                    <input className="borderStyle" type="password" name="password" placeholder="Enter password" onBlur={handleBlur} required />
                                    <br />
                                    <br />
                                    <input className="borderStyle" type="password" name="confirmPassword" placeholder="Confirm Password" onBlur={handleBlur} required />
                                
                                <br />
                                <p className="text-center"><b>Already have an account?</b><Link onClick={handleLogin} style={{color:'orange'}}>Login</Link></p>
                                <button onClick={handleSubmit} style={{ width: '100%', backgroundColor: 'orange', color: 'white' }} >Sign up</button>
                                {
                                    !user.confirmPassword && <p className="text-center" style={{color:'red'}}>{user.alert}</p> 
                                }
                            </div>
                    }
                    
                </div>   
                {
                 !user?.success && <p style={{color:'red',backgroundColor:'red'}}>{user.error}</p>
                }
                <br />
                {
                    !user?.isSignedIn ? <button className='border rounded' onClick={googleSignIn}><FcGoogle size='2rem' style={{ marginRight: '20px' }} /><b>Continue with Google</b></button>
                        :
                        <button className='border rounded' onClick={googleSignOut}><FcGoogle size='2rem' style={{ marginRight: '20px' }} /><b>Sign Out</b></button>
                }
            </div>
        </div>
    );
};

export default SignUpOrLogin;