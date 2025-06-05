import { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
export const ContextApi = createContext();

const ContextProvider = (props) => {
  const url = "http://localhost:8000";

  const [data, setData] = useState([]);
  //User FullDetails Data
  const [personalData, setPersonalData] = useState({});
  const [addressData, setAddressData] = useState({});
  const [educationData, setEducationData] = useState({});
  const [docsData, setDocsData] = useState({});
  // const {userId} = useParams()
console.log(personalData);
console.log(addressData);
console.log(educationData);
console.log(docsData);

  const fetchPersonalData = async (e) => {
    try {
      const response = await axios.get(
        `${url}/api/personal/get-single-personal-info/${localStorage.getItem("userId")}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setPersonalData(response.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchAddressData = async (e) => {
    try {
      const response = await axios.get(
        `${url}/api/address/single-address/${localStorage.getItem("userId")}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setAddressData(response.data.data);
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

  console.log(personalData);
  
  useEffect(() => {
    fetchData();
    fetchPersonalData();
    fetchAddressData();
    fetchEducationalData();
    fetchDocs();
  }, []);

  const value = {
    url,
    data,
    personalData,
    addressData,
    educationData,
    docsData,
  };

  return (
    <ContextApi.Provider value={value}>{props.children}</ContextApi.Provider>
  );
};

export default ContextProvider;
