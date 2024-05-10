import React from 'react'

const SideBar = ({directory}) => {
  const RenderList = ({ items }) => (
    
    <ul className="list-group-nested" >
      {
        
      // items.map((item) => (
      //   <li key={item.name} >
      //     <img src={item.url} className='directory-img'></img>
      //     {item.name}
      //   </li>
      // ))
      items.map((item) => (
        <li key={item.name} >
          <img src={item.url} className='directory-img'></img>
          {item.name}
        </li>
      ))
    }
    </ul>
  );

  const RenderDirectory = ({ directory }) => (
    <ul className="list-group">
      {Object.entries(directory).map(([key, value]) => (
        <li key={key}>
                    <img src='./folder01.png' className='directory-img'></img>
          {key}
          
          <RenderList items={value} />
        </li>
      ))}
    </ul>
  );
  return (
    <div>
        <div className='side-bar'>
            <h3>Directory</h3>
            <RenderDirectory directory={directory} />
            
        </div>  
    </div>
  )
}

export default SideBar