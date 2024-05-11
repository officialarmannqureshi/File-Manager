import "./App.css";
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
const Auth = lazy(() => import('./components/Auth'));
const FileDashBoard = lazy(() => import('./components/FileDashBoard'));
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyASKhM_3UmxgCOT0tBTx175--lMLhaAXO8",
//   authDomain: "clienter-ai-file-manager.firebaseapp.com",
//   projectId: "clienter-ai-file-manager",
//   storageBucket: "clienter-ai-file-manager.appspot.com",
//   messagingSenderId: "475065909137",
//   appId: "1:475065909137:web:5d0773f33708a7039a6430"
// };
// // const auth = getAuth(app);
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

function App() {
    return (
    <>
    <Suspense fallback={<div className="container">Loading...</div>}></Suspense>
       <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<FileDashBoard />} />
          
       </Routes>
    </>
  );
}

export default App;
