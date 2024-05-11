// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASKhM_3UmxgCOT0tBTx175--lMLhaAXO8",
  authDomain: "clienter-ai-file-manager.firebaseapp.com",
  projectId: "clienter-ai-file-manager",
  storageBucket: "clienter-ai-file-manager.appspot.com",
  messagingSenderId: "475065909137",
  appId: "1:475065909137:web:5d0773f33708a7039a6430"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;