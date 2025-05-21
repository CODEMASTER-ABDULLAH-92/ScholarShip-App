import {createContext } from "react";

export const ContextApi = createContext();

const contextProvider = (props) => {
  const url = "http://localhost:8000";

  const value = {
    url
  };
  return (
    <ContextApi.Provider value={value}>{props.children}</ContextApi.Provider>
  );
};

export default contextProvider;
