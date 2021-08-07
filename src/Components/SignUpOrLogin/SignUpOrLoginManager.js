import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeSignInAndLoginFrameWork = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    else {
        firebase.app();
    }
};

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then((res) => {
            const {displayName, email} = res.user;
            const userDetails = {
                isSignedIn:true,
                success:true,
                displayName:displayName,
                email:email,
            }
            return userDetails;
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}

export const handleGoogleSignOut = ()=>{
    return firebase.auth().signOut()
    .then(() => {
        const SignOutUserDetails = {
            isSignedIn:false,
            success:false,
            name:'',
            email:'',
      }
      return SignOutUserDetails;
    })
      .catch((error) => {
        });
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(name, email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.name = name;
            newUserInfo.error = '';
            newUserInfo.success = true;
            newUserInfo.newUser = true;
            updateUserInfo(name);
            return newUserInfo;
        })
        .catch((error) => {
            const errorMessage = error.message;
            const showErrorMessage = {};
            showErrorMessage.error = errorMessage;
            showErrorMessage.success = false;
            showErrorMessage.newUser = false;
            return showErrorMessage;
        });
}

export const signInUserWithEmailAndPassword = ( email, password) => {
    return firebase.auth().signInWithEmailAndPassword( email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            newUserInfo.newUser = true;
            return newUserInfo;
        })
        .catch((error) => {
            // const errorMessage = error.message;
            const showErrorMessage = {};
            showErrorMessage.error = 'Email or password is Wrong';
            showErrorMessage.success = false;
            showErrorMessage.newUser = false;
            return showErrorMessage;
        });
}
// update user name when create new account
const updateUserInfo = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(() => {
        console.log('User name updated successfully');
    }).catch((error) => {
        console.log('Opps! that in not possible');
        console.log(error.message);
    });
}