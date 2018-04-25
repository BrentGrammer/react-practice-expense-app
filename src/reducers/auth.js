// Auth reducer to handle tracking user id on user.uid from firebase.auth() for route access and protecting routes:
// reducer handles actions for logging in and logging out

// This reducer will update an auth object inside the redux store, and will fill it with user id info when logged in and 
// empty the object when the user logs out.
// Note: the reason to store user id as a prop in an object is so that in the future, you can add props to the user object
// here if you want to store other user data.
export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
        // return state object if user logs in - the action will send the uid of the user:
            return {
                uid: action.uid
            };
        case 'LOGOUT':
        // return empty object if user logs out:
            return {};
        // if action dispatched is not logout or login, then just return the current state:
        default:
            return state;
    }
};
