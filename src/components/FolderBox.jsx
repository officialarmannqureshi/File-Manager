import React, { useEffect, useState } from "react";

const FolderBox = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkedFiles, setCheckedFiles] = useState();

  const handleCheck = (e) => {
    const type= isChecked? "remove":"add";
    const { name } = e.target;
    
    let updatedCheckedFiles;
    if (isChecked === false) {
      setIsChecked(true);
      updatedCheckedFiles = name;
    } else {
      setIsChecked(false);
      updatedCheckedFiles = name;
    }
    
    setCheckedFiles(updatedCheckedFiles);
    props.onFileChecked(updatedCheckedFiles,type); // Send updatedCheckedFiles to parent
  };
  return (
    <div className="file-check">
      {isChecked ? (
        <div className="checkbutton">
          <img src="./check.png" alt="" srcset="" />
        </div>
      ) : null}

      <div className="file-box">
        <div className="file-img-box">
          <img
            src={props.url}
            className={props.className}
            name={props.name}
            onClick={handleCheck}
          ></img>
          <p>{props.name}</p>
        </div>
      </div>
    </div>
  );
};

export default FolderBox;
