import React, { useState, useEffect } from "react";
import DataContext from "./dataContext";
import { videoData } from "../assets/data";

function DataProvider({ children }) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate API fetch
  useEffect(() => {
    try {
      // future me yaha API call hoga
      setData(videoData);
      setLoading(false);
    } catch (err) {
      setError("Failed to load data");
      setLoading(false);
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        loading,
        error
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;






// import React from 'react'
// import DataContext from './dataContext.js'

// function DataProvider({children}) {

//     const [data, setData] = React.useState(null);




//   return (
//     <DataContext.Provider value={{data, setData}}>
    
//         {children}
//     </DataContext.Provider>
//   )
// }

// export default DataProvider
