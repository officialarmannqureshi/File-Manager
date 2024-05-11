import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import MainDashboard from "./MainDashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, listAll } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
const FileDashBoard = () => {
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);
  const [checkedFiles, setCheckedFiles] = useState([]);
  const [currentFolder, setCurrentFolder] = useState("Main");
  const [file, setFile] = useState(null);
  const [directories, setDirectories] = useState({ Main: [] });

  useEffect(() => {
    const storage = getStorage();
    const listRef = ref(storage, "");

    let isMounted = true;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("uid", user.uid);
        handleListAll(listRef, isMounted);

        handleView(listRef);
      } else {
        console.log("user is logged out");
        navigate("/");
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleListAll = (listRef, isMounted) => {
    listAll(listRef)
      .then((res) => {
        const newFolders = [];
        const newDirectories = { ...directories };

        res.prefixes.forEach((folderRef) => {
          const name = folderRef.name;
          const folderUrl1 = "./folder0.png";
          const folderUrl2 = "./folder01.png";
          newFolders.push({ name, url: folderUrl1 });
          newDirectories[currentFolder] = [
            ...newDirectories[currentFolder],
            { name, url: folderUrl2 },
          ];
        });

        res.items.forEach((itemRef) => {
          console.log(itemRef);
          const name = itemRef.name;
          const fileUrl1 = "./document (1).png";
          const fileUrl2 = "./document.png";
          newFolders.push({ name, url: fileUrl1 });
          newDirectories[currentFolder] = [
            ...newDirectories[currentFolder],
            { name, url: fileUrl2 },
          ];
        });

        if (isMounted) {
          setFolders(newFolders);
          setDirectories(newDirectories);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleCreateNewFolder = (name, url) => {
    const newUrl = "./folder01.png";

    setDirectories((prevDirectories) => ({
      ...prevDirectories,
      [currentFolder]: [
        ...prevDirectories[currentFolder],
        { name, url: newUrl },
      ],
    }));
    setFolders((prevFolders) => [...prevFolders, { name, url }]);
  };

  const handleUpload = (e) => {
    const url = "./document.png";
    const newUrl = "./document (1).png";
    const filePath = e.target.value;
    const fileName = filePath.split("\\").pop();

    e.preventDefault();
    setFile(e.target.value);

    setDirectories((prevDirectories) => ({
      ...prevDirectories,
      [currentFolder]: [
        ...prevDirectories[currentFolder],
        { name: fileName, url },
      ],
    }));
    setFolders((prevFolders) => [
      ...prevFolders,
      { name: fileName, url: newUrl },
    ]);
  };

  const handleRename = () => {
    if (checkedFiles.length !== 1) {
      alert("Please select exactly one item to rename");
      return;
    }
    const newName = prompt("Enter the new name");
    if (!newName) return;

    for (const folder of folders) {
      if (newName.includes(folder.name)) {
        alert("Folder name already exists");
        return;
      }
    }

    setDirectories((prevDirectories) => ({
      ...prevDirectories,
      [currentFolder]: prevDirectories[currentFolder].map((file) => {
        if (checkedFiles.includes(file.name)) {
          return { ...file, name: newName };
        }
        return file;
      }),
    }));

    setFolders((prevFolders) => [
      ...prevFolders.map((folder) => {
        if (checkedFiles.includes(folder.name)) {
          return { ...folder, name: newName };
        }
        return folder;
      }),
    ]);
  };

  const handleFileChecked = (file, type) => {
    let updatedCheckedFiles;

    if (type === "add") {
      updatedCheckedFiles = [...checkedFiles, file];
    } else if (type === "remove") {
      updatedCheckedFiles = checkedFiles.filter((f) => f !== file);
    }

    setCheckedFiles(updatedCheckedFiles);
  };

  const handleDelete = () => {
    const updatedFolders = folders.filter(
      (folder) => !checkedFiles.includes(folder.name)
    );
    setFolders(updatedFolders);

    const updatedDirectories = { ...directories };
    updatedDirectories[currentFolder] = directories[currentFolder].filter(
      (file) => !checkedFiles.includes(file.name)
    );

    setDirectories(updatedDirectories);
    setCheckedFiles([]);
  };

  const handleView = (downloadRef) => {
    let Url;
    console.log(checkedFiles);
    if (checkedFiles.length > 1) {
      alert("Please select exactly one item to view");
      return;
    } else if (checkedFiles.length === 1) {
      const regrexPath = /(.*)(?:\.)([a-z][a-z][a-z])/;
      const fileName = checkedFiles[0];

      const result = fileName.match(regrexPath);

      if (result === null) {
        alert("Please select a file");
        return;
      } else {
        const storage = getStorage();
        const downloadRef = ref(storage, fileName);
        console.log(downloadRef);
        getDownloadURL(downloadRef)
          .then((url) => {
            // Insert url into an <img> tag to "download"
            Url = url;
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch((error) => {
            // Handle errors
            console.error("Error getting download URL:", error);
            alert("Error downloading the file. Please try again.");
          });
      }
    }
  };

  return (
    <>
      <NavBar
        handleNewFolder={handleCreateNewFolder}
        handleUpload={handleUpload}
        handleRename={handleRename}
        handleDelete={handleDelete}
        handleView={handleView}
      />
      <SideBar directory={directories} />
      <MainDashboard contents={folders} onFileChecked={handleFileChecked} />
    </>
  );
};

export default FileDashBoard;
