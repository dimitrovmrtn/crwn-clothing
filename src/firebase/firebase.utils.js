import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyDF79r6g4Brrt74StfOj6w60raWo6CNAMM",
  authDomain: "crown-db-475cb.firebaseapp.com",
  databaseURL: "https://crown-db-475cb.firebaseio.com",
  projectId: "crown-db-475cb",
  storageBucket: "",
  messagingSenderId: "303705639387",
  appId: "1:303705639387:web:e409fd09e697544a"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {

  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get()

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;