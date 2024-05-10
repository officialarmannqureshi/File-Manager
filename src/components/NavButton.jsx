import React from 'react';

const NavButton = (props) => {
  if (props.type === 'file') {
    return (
      <label className={`nav-rect ${props.className}`}>
        <input type="file" onChange={props.onChange} hidden/>
        <img src={props.img_url} className='img-size' />
        {props.children}
      </label>

      
    );
  } else {
    return (
      <button className={`nav-rect ${props.className}`} onClick={props.onClick} type={props.type}>
        <img src={props.img_url} className='img-size' />
        {props.children}
      </button>
    );
  }
};

export default NavButton;