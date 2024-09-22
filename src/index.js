import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMOVzoxq7Hdhfr6YaTZcVIZIayC3X29Dk",
  authDomain: "smartkids-448ef.firebaseapp.com",
  projectId: "smartkids-448ef",
  storageBucket: "smartkids-448ef.appspot.com",
  messagingSenderId: "402893268099",
  appId: "1:402893268099:web:878c2bdb48fe49d2a867b6",
  measurementId: "G-4VJHY4WYE8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, user => {
    if(user != null){
        console.log("logged in!");
    }
    else {
        console.log("no user");
    }
});