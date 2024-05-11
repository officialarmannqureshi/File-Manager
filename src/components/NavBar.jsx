import React, { useContext } from 'react'
import '../App.css'
import NavButton from './NavButton'
import {  signOut } from "firebase/auth";
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
// import { Outlet } from "react-router-dom";
const NavBar = ({ handleNewFolder, handleUpload,handleRename,handleDelete,handleView }) => {
  const navigate = useNavigate()
  const handleNewFolderClick = (name, icon) => {
    return (e) => {
      handleNewFolder(name, icon);
    };
  };

  const handleSignOut = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
          navigate("/");
          console.log("Signed out successfully")
      }).catch((error) => {
      // An error happened.
        console.log(error);
      });
  }

  return (
    <div className='navbar-main'>
      <div className='nav-grid-container'>
        <NavButton img_url="./plus (1).png" onClick={handleNewFolderClick('Untitled','./folder0.png')}>NEW FOLDER</NavButton>
        <NavButton img_url="./cloud-computing.png" onChange={handleUpload} type='file'>UPLOAD</NavButton>
        <NavButton img_url="./rename.png" onClick={handleRename} >RENAME</NavButton>
        <NavButton img_url="./bin.png" onClick={handleDelete} >Delete</NavButton>
        <NavButton img_url="./bin.png" onClick={handleView} >View</NavButton>
      </div>
      {/* <NavButton img_url="./magnifying-glass.png" className='nav-search'>
        <input className='input-css'></input>
      </NavButton> */}
     
      <NavButton className="signout" onClick={handleSignOut}>Sign Out</NavButton>
     
      
    </div>
  )
}

export default NavBar