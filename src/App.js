import "./App.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import MainDashboard from "./components/MainDashboard";
import { useState } from "react";
function App() {
  const [folders, setFolders] = useState([
    { name: "Download", url: "./folder0.png" },
    { name: "Documents", url: "./folder0.png" },
    { name: "Photos", url: "./folder0.png" },
    { name: "Vscode", url: "./folder0.png" },
  ]);
  const [Checkedfiles, setCheckedfiles] = useState([]);
  const [currentFolder, setCurrentFolder] = useState("Main");
  const [file, setFile] = useState(null);
  const [directories, setDirectories] = useState({
    Main: [
      { name: "Download", url: "./folder01.png" },
      { name: "Documents", url: "./folder01.png" },
      { name: "Photos", url: "./folder01.png" },
      { name: "Vscode", url: "./folder01.png" },
    ],
  });

  const handleCreateNewFolder = (name, url) => {
    const newUrl = "./folder01.png";

    setDirectories((prevDirectories) => {
      const newDirectories = {
        ...prevDirectories,
        [currentFolder]: [
          ...prevDirectories[currentFolder],
          { name, url: newUrl },
        ],
      };
      return newDirectories;
    });
    setFolders((prevFolders) => [...prevFolders, { name, url }]);
  };

  const handleUpload = (e) => {
    const url = "./document.png";
    const newUrl = "./document (1).png";
    const filePath = e.target.value;
    const fileName = filePath.split("\\").pop();

    e.preventDefault();
    setFile(e.target.value);

    setDirectories((prevDirectories) => {
      const newDirectories = {
        ...prevDirectories,
        [currentFolder]: [
          ...prevDirectories[currentFolder],
          { name: fileName, url },
        ],
      };
      return newDirectories;
    });
    setFolders((prevFolders) => [
      ...prevFolders,
      { name: fileName, url: newUrl },
    ]);
  };

  const handleRename = () => {
    if (Checkedfiles.length !== 1) {
      alert("Please select exactly one item to rename");
      return;
    }
    const newName = prompt("Enter the new name");
    if (!newName) return; // If user cancels the prompt

    for (const folder of folders) {
      if (newName.includes(folder.name)) {
        alert("Already exists folder name");
        return;
      }
    }
    const updatedDirectories = {
      ...directories,
      [currentFolder]: directories[currentFolder].map((file) => {
        if (Checkedfiles.includes(file.name)) {
          return { ...file, name: newName };
        }
        return file;
      }),
    };

    setDirectories(updatedDirectories);
    setFolders((prevFolders) => [
      ...prevFolders.map((folder) => {
        if (Checkedfiles.includes(folder.name)) {
          return { ...folder, name: newName };
        }
        return folder; // Return the original folder if it's not included in Checkedfiles
      }),
    ]);
  };

  const handleFileChecked = (file, type) => {
    let updatedCheckedFiles;

    if (type === "add") {
      updatedCheckedFiles = [...Checkedfiles, file];
    } else if (type === "remove") {
      updatedCheckedFiles = Checkedfiles.filter((f) => f !== file);
    }

    setCheckedfiles(updatedCheckedFiles);
  };

  const handleDelete = () => {
    const updatedFolders = folders.filter(folder =>!Checkedfiles.includes(folder.name));
    setFolders(updatedFolders);

    const updatedDirectories = {...directories };
  updatedDirectories[currentFolder] = directories[currentFolder].filter(file =>!Checkedfiles.includes(file.name));

 
  setDirectories(updatedDirectories);
  setCheckedfiles([])
    
  };

  return (
    <div className="App">
     
        <NavBar
          handleNewFolder={handleCreateNewFolder}
          handleUpload={handleUpload}
          handleRename={handleRename}
          handleDelete={handleDelete}
        />
        <SideBar directory={directories} />
        <MainDashboard contents={folders} onFileChecked={handleFileChecked} />
     
    </div>
  );
}

export default App;
