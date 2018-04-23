// Create a new promise instance where you define a asynchronous task to do, and then call one of the two built in methods 
// passed in to the args that runs when the task is completed successfully or if it fails.

// if resolve is called, the task was successful and data was retrieved, etc., if reject is called, then there was 
// an error.

// Note: most of the time, the promises are created for you (i.e. they are already in the Firebase library), so you don't see this code in your projects.

const promise = new Promise((resolve, reject) => {
    resolve('data was retrieved successfuly!');
    reject('there was an error');
});

// Register callbacks on the Promise instance that fire when and if the promise resolves or fails:


// Most of the time you only write the .then and .catch to do something when the promise reolves or rejects.  
// The promise will handle creating the promise itself so you don't write the code above.

// .then() fires when and if the promise resolves successfully with the callback defined:
// in the .then callback, you have access in the args to any data that was passed to resolve in the promise:
promise.then((data) => {
    console.log('data'); // this will fire when the promise resolve function completes successfully.
}).catch((error) => {
    console.log('error: ', error); // this prints the arg passed into reject in the promise
});

// NOTE: A promise can either be resolved or rejected. You can't resolve and reject the same promise, and you can 
// only resolve or reject a single time.

// only one argument can be passed into resolve() or reject() (you can pass one object if you want)