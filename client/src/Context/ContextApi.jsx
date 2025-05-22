import { useState,useEffect } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const ContextApi = createContext();

const ContextProvider = (props) => {
  const url = "http://localhost:8000";




  const [data,setData] = useState([]);

  const fetchData = async () =>{
  
    try {
      const response = await axios.get(`${url}/api/scholarship/list-scholarShipDetails`);
      if (response.data.success) {
        setData(response.data.data);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  
  useEffect(()=>{
  fetchData();
  },[])










  const value = {
    url,data
  };

  return (
    <ContextApi.Provider value={value}>
      {props.children}
    </ContextApi.Provider>
  );
};

export default ContextProvider;
