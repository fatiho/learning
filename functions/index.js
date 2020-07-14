const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// // Take the text parameter passed to this HTTP endpoint and insert it into
// // Cloud Firestore under the path /messages/:documentId/original
// exports.addMessage = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into Cloud Firestore using the Firebase Admin SDK.
//   const writeResult = await admin
//     .firestore()
//     .collection('messages')
//     .add({original: original});
//   // Send back a message that we've succesfully written the message
//   res.json({result: `Message with ID: ${writeResult.id} added.`});
// });

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.addMessage = functions.https.onCall((data) => {
  // Message text passed from the client.
  const atext = data.text;

  return admin
    .firestore()
    .collection('texts')
    .add({
      text: atext,
    })
    .then(() => {
      console.log('New Message written');
      // Returning the sanitized message to the client.
      return {text: atext};
    });
});

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.addPost = functions.https.onCall((data) => {
  // Message text passed from the client.
  const name = data.name;
  const post = data.post;
  const id = data.userId;

  return admin
    .firestore()
    .collection('users')
    .add({
      name: name,
      post: post,
      userId: id,
    })
    .then(() => {
      console.log('New Message written');
      // Returning the sanitized message to the client.
      return {text: post};
    });
});

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.getPosts = functions.https.onCall((data) => {
  // Message text passed from the client.
  const docRef = admin.firestore().collection('users');
  var array = [];
  var titles = [];
  var ids = [];
  var email = data.email;
  return docRef
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(email);
        if (doc.data().userId == email) {
          console.log('BOO YAH');
          console.log(`${doc.id} => ${doc.data().userId}`);
          array.push(doc.data().post);
          titles.push(doc.data().name);
          ids.push(doc.id);
          console.log(array.length);
        }
      });
      console.log('one ' + array.toString());
      //   arry = array;
      //   title = titles;
      //   id = ids;
      return {a: array, b: titles, c: ids};
    })
    .catch(function (error) {
      console.log('got an error', error);
    });

  //   return {interesting: admin.firestore().collection('users').get()};
  // .then(() => {
  //   console.log('New Message written');
  //   // Returning the sanitized message to the client.
  //   return {text: post};
  // });
});

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.getPost = functions.https.onCall((data) => {
  // Message text passed from the client.
  const docRef = admin.firestore().collection('users');
  var array = [];
  var titles = [];
  var ids = [];
  var itemId = data.email;
  return docRef
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().name == itemId) {
          console.log('BOO YAH');
          console.log(`${doc.id} => ${doc.data().userId}`);
          array.push(doc.data().post);
          titles.push(doc.data().name);
          ids.push(doc.id);
          console.log(array.length);
        }
      });
      console.log('one ' + array.toString());
      return {a: array, b: titles, c: ids};
    })
    .catch(function (error) {
      console.log('got an error', error);
    });

  //   return {interesting: admin.firestore().collection('users').get()};
  // .then(() => {
  //   console.log('New Message written');
  //   // Returning the sanitized message to the client.
  //   return {text: post};
  // });
});

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.deletePost = functions.https.onCall((data) => {
  // Message text passed from the client.
  var id = data.email;
  const docRef = admin.firestore().collection('users').doc(id);

  return docRef
    .delete()
    .then(function () {
      console.log('Document successfully deleted!');
    })
    .catch(function (error) {
      console.error('Error removing document: ', error);
    });

  //   return {interesting: admin.firestore().collection('users').get()};
  // .then(() => {
  //   console.log('New Message written');
  //   // Returning the sanitized message to the client.
  //   return {text: post};
  // });
});

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore
  .document('/messages/{documentId}')
  .onCreate((snap, context) => {
    // Grab the current value of what was written to Cloud Firestore.
    const original = snap.data().original;

    // Access the parameter `{documentId}` with `context.params`
    functions.logger.log('Uppercasing', context.params.documentId, original);

    const uppercase = original.toUpperCase();

    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to Cloud Firestore.
    // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
    return snap.ref.set({uppercase}, {merge: true});
  });
