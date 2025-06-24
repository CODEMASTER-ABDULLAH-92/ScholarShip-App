import { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
export const ContextApi = createContext();

const ContextProvider = (props) => {
  const url = "http://localhost:8000";

  const [data, setData] = useState([]);
  //User FullDetails Data
  const [personalData, setPersonalData] = useState({});
  const [addressData, setAddressData] = useState({});
  const [educationData, setEducationData] = useState({});
  const [docsData, setDocsData] = useState({});
  const [status,setStatus] = useState("");
  const [statusEdu,setStatusEdu] = useState("");
  const [statusAddress,setStatusAddress] = useState("");

  //Total Applications 
  const [totalApplications,setTotalApplications] = useState([]);
  const {userId} = useParams()

  const token = Cookies.get("token");

  const fetchPersonalData = async (e) => {
    try {
      const response = await axios.get(
        `${url}/api/personal/get-single-personal-info/${localStorage.getItem("userId")}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setPersonalData(response.data.data);
        setStatus(response.data.status)
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  const gettingAppTotal = () => {
    const ids = data.map((item) => item._id); 
    setTotalApplications(ids.length);
  };
 console.log(totalApplications);
 

  const fetchAddressData = async (e) => {
    try {
      const response = await axios.get(
        `${url}/api/address/single-address/${localStorage.getItem("userId")}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setAddressData(response.data.data);
        setStatusAddress(response.data.status);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const fetchEducationalData = async () => {
    try {
      const response = await axios.get(
        `${url}/api/education/single-education/${localStorage.getItem(
          "userId"
        )}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setEducationData(response.data.data);
        setStatusEdu(response.data.status)
      }

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${url}/api/scholarship/list-scholarShipDetails`
      );
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchDocs = async () => {
    try {
      const response = await axios.get(
        `${url}/api/docs/get-single-docs/${localStorage.getItem("userId")}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setDocsData(response.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  
  useEffect(() => {
    fetchData();
    fetchPersonalData();
    fetchAddressData();
    fetchEducationalData();
    fetchDocs();
    gettingAppTotal();
  }, [token,userId]);


  useEffect(() => {
    if (data.length > 0) {
      gettingAppTotal();
    }
  }, [data]);
  const value = {
    url,
    data,
    personalData,
    addressData,
    educationData,
    docsData,
    status,
    statusAddress,
    statusEdu,
    totalApplications
  };

  return (
    <ContextApi.Provider value={value}>{props.children}</ContextApi.Provider>
  );
};

export default ContextProvider;
