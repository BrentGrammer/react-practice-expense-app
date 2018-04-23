// This file connects to the database and then other files that need the connection can just import this file.
// import firebase (the * as takes all the named exports from firebase and puts them inside a variable called firebase)
import * as firebase from 'firebase';

 // Initialize Firebase (originally copied and pasted from firebase website, but now assigned to the NODE environment
// vars for security -- these are set in the .env files and also in webpack.config.js with DefinePlugin)
 const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };
// connect the app to the db with the config obj passed in:
firebase.initializeApp(config);

// set the database method to contact database to a const so you don't have to type it out all the time:
const database = firebase.database();

//export firebase (as named export) and the database variable (as default) so other components can access it if 
//need be:
export { firebase, database as default };








  /**
      LEFT FOR REFERENCE:
  */
//   // create list data structure that works with firebase (firebase does not support arrays):
//   // the keys on the prop in the object for notes will be the ids you want to reference:
//   const expenses = {
//       notes: {
//           1: {
//             title: 'First Note',
//             body: 'this is my note'
//           },
//           2: {
//             title: 'Second Note',
//             body: 'this is my note'
//           },
//           3: {
//             title: 'Third Note',
//             body: 'this is my note'
//           }
//       }
//   };

// //   database.ref('expenses').push({
// //       description: 'Title here',
// //       note: 'this is the body',
// //       amount: 233,
// //       createdAt: 'today'
// //   });
// //   database.ref('expenses').push({
// //     description: 'Title here2',
// //     note: 'this is the body',
// //     amount: 777,
// //     createdAt: 'today'
// // });
// // database.ref('expenses').push({
// //     description: 'Title here3',
// //     note: 'this is the body',
// //     amount: 44,
// //     createdAt: 'today'
// // });

// /** 
//  * 
//  * grab list data and convert to an array
//  * 
//  **/
// // database.ref('expenses')
// //    .once('value')
// //    .then((snapshot) => {
// //        // create empty array:
// //        const expenses = [];
// //        // iterate over child snapshots useing builtin forEach method on snapshot and put them in the array:
// //        snapshot.forEach((childSnapshot) => {
// //           // push in an object from each childSnapshot to empty expenses array:
// //           expenses.push({
// //             // you can set the id for each expense item in array to the key of each list item in the db being iterated through,
// //             // which has a key set to the unique id provided by push() when it was added to the db:
// //             id: childSnapshot.key,
// //             // access the data in the child snapshot with .val() and spread out the props stored in the list item being 
// //             // iterated to set the properties:
// //             ...childSnapshot.val()
// //           });  
// //        });
// //        console.log(expenses);
// //     })
// //     .catch((e) => {
// //             console.log(e);
// //     });

//     /**
//      * Subscribe to a list of data in the db converting it to array each time
//      */
//     database.ref('expenses')
//         .on('value', (snapshot) => {   
//             const expenses = [];  
//             snapshot.forEach((childSnapshot) => {
//                 expenses.push({        
//                     id: childSnapshot.key,
//                     ...childSnapshot.val()
//                 }); 
//             });
//             console.log(expenses); 
//         }, (e) => {
//             console.log(e);
//         });

// /**
//  * DIFFERENT EVENTS TO SUBSCRIBE TO USING LISTS:
//  */
// //'child_removed': this sets a callback to fire whenever a child of the expenses ref is deleted:
// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val()); //this returns the id and data of the removed item in snapshot
// });
// // 'child_changed': fires callback when a child for a ref changes:
// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val()); //this returns the id and data of the changed item in snapshot
// });

// //'child_added': fire callback when a child item is added to the ref:
// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val()); //this returns the id and data of the changed item in snapshot
// });

// //   database.ref().set({
// //       name: 'brent',
// //       age: 44,
// //       location: {
// //           city: 'Cleveland',
// //           state: 'Ohio'
// //       }
// //   });

// //   database.ref('location/city').set('boston');

// //   database.ref('attributes').set({
// //       height: 110,
// //       weight: 45
// //   }).then(() => {
// //       console.log('data was updated!!');
// //   }).catch((error) => {
// //     console.log('this failed', error);
// //   });

// //   database
// //     .ref('location/city')
// //     .remove()
// //     .then(() => {
// //         console.log('data deleted!!');
// //     })
// //     .catch((error) => {
// //         console.log(error);
// //     });

// //     database.ref().update({
// //         name: 'mike',
// //         age: 33,
// //         job: 'plumber',
// //         'location/city': 'boston',
// //         attributes: null
// //     });

// // Fetching Data once with .once() -- takes an argument which is an event type as a string.
// // once() returns a promise you can use to handle success or fail of the fetch
// // the data returned from the fetch can be used in the .then() callback argument and passed in as snapshot (this is 
// // what it is called by convention)
// // snapshot is a collection or object that contains the fetched data which can be accessed with .val()
// // database.ref('location')
// //    .once('value')
// //    .then((snapshot) => {
// //         const val = snapshot.val();
// //         console.log(val);
// //    })
// //    .catch((error) => {
// //       console.log(error);
// //    });

//    //Using .on() to subscribe to db to listen for changes on data fetched:
//    // on takes to args - the event as a string and a callback to run when value comes back.
//    // use callback pattern and not a promise with then, etc. because promises can only resolve one time and we need a function
//    // to run multiple times everytime there is an update.

//    // this will set the subscription and store the returned callback in the const to use with .off() later:
// //    const onValueChange = database.ref().on('value', (snapshot) => {
// //       console.log(snapshot.val());
// //    }, (error) => {
// //        console.log(error);
// //    });

//    // remove the subscription by using .off() and passing in the callback used with .on()
// //    database.ref().off(onValueChange);

//    // Getting data and printing to screen:
//    // the fetched db data is stored and returned in snapshot.val() method which returns an object holding the fetched data:
// //    database.ref().on('value', (snapshot) => {
// //       const val = snapshot.val();
// //       console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// //    }, (error) => {
// //        console.log('there was an error', error);
// //    });