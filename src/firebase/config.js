import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCCFPRymihgQ1kTvBsX1kj0veLB-lLee_w",
  authDomain: "shopping-2f222.firebaseapp.com",
  databaseURL: "https://shopping-2f222.firebaseio.com",
  projectId: "shopping-2f222",
  storageBucket: "shopping-2f222.appspot.com",
  messagingSenderId: "1067153854717",
  appId: "1:1067153854717:web:d6b815553eda86f0f4ae94",
  measurementId: "G-43LGD811DC",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const storage = firebase.storage();

export { storage, firebase };
