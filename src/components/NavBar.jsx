import React, { useContext } from 'react'
import '../App.css'
import NavButton from './NavButton'

const NavBar = ({ handleNewFolder, handleUpload,handleRename,handleDelete }) => {

  const handleNewFolderClick = (name, icon) => {
    return (e) => {
      handleNewFolder(name, icon);
    };
  };

  return (
    <div className='navbar-main'>
      <div className='nav-grid-container'>
        <NavButton img_url="./plus (1).png" onClick={handleNewFolderClick('Untitled','./folder0.png')}>NEW FOLDER</NavButton>
        <NavButton img_url="./cloud-computing.png" onChange={handleUpload} type='file'>UPLOAD</NavButton>
        <NavButton img_url="./rename.png" onClick={handleRename} >RENAME</NavButton>
        <NavButton img_url="./bin.png" onClick={handleDelete} >Delete</NavButton>
      </div>
      <NavButton img_url="./magnifying-glass.png" className='nav-search'>
        <input className='input-css'></input>
      </NavButton>
    </div>
  )
}

export default NavBar