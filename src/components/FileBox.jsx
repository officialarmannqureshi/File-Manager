import React from 'react'

const FileBox = (props) => {
  return (
 
        <div className='file-box'>
            <img src={props.img_url} className={props.className} alt='fileimg'></img>
            <p>{props.file_name}</p>
        </div>
 
  )
}

export default FileBox