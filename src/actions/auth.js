import { firebase, googleAuthProvider } from '../firebase/firebase';

// returns object with type and user.uid passed in set to prop:
export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

// named export which starts login process (this is an asynchronous redux action) when login btn clicked on LoginPage.js:
export const startLogin = () => {
    return () => {
        // the way the login process starts is with a function that takes the auth provider as it's argument:
        // (the provider was setup and assigned and exported in firebase.js)
        return firebase.auth().signInWithPopup(googleAuthProvider)
    };
};

// logout action gen returns an empty object to the auth reducer to put in store if user logs out.
export const logout = () => ({
    type: 'LOGOUT'
});

// triggered when user clicks logout btn to tell provider to log them out of their assoc. account.
export const startLogout = () => {
    return () => {
        // companion method to signIn...() - signOut() takes no args:
        return firebase.auth().signOut()
    };
};