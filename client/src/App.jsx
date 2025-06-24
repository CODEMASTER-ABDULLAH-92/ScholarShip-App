import gsap from "gsap";
import React, { useRef } from "react";
import Footer from "./compoenent/Footer";
import Navbar from "./compoenent/Navbar";
import { Route, Routes } from "react-router-dom";
import Address from "./pages/Address";
import Docs from "./pages/Docs";
import Home from "./pages/Home";
import PersonalDetail from "./pages/Personal";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/register";
import { useEffect } from "react";
import ScholarShips from "./pages/ScholarShips";
import Details from "./pages/Details";
import { ToastContainer } from "react-toastify";
import DashPage from "./Dashboard/DashPage";
import { useLocation } from "react-router-dom";
import NewScholarshipPage from "./Dashboard/AddData";
import UpdateScholarship from "./Dashboard/UpdateScholarship";
import UserDashBoard from "./Dashboard/UserDashBoard";
import ScholarshipApplication from "./Dashboard/CompleteData";
import Education from "./pages/Education";
import RecruiterLoginPage from "./pages/RecruiterLogin";
import RecruiterRegister from "./pages/RegisterRecruiter";
import BackendConnectionNotice from "./compoenent/Backend";
const App = () => {
  const homeRef = useRef();
  useEffect(() => {
    gsap.fromTo(
      homeRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: homeRef.current,
          scroller: "body",
        },
      }
    );
  }, []);

  // axios.defaults.withCredentials = true;
  const location = useLocation();
  return (
    <div ref={homeRef}>
      <ToastContainer />
      <BackendConnectionNotice/>
      {location.pathname.includes("/dashboard/") || location.pathname.includes("/recruiter-dashboard") ? "" : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personal-Info" element={<PersonalDetail />} />
        <Route path="/education" element={<Education />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/address" element={<Address />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/scholaships" element={<ScholarShips />} />
        <Route path="/Scholarship/:id" element={<Details />} />

        {/* Dashboard  */}

        <Route path="/dashboard/admin-dashboard/:id" element={<DashPage />} />
        <Route path="/dashboard/add-data" element={<NewScholarshipPage />} />
        <Route
          path="/dashboard/update-scholarship/:id"
          element={<UpdateScholarship />}
        />
        <Route
          path="/dashboard/user-dashboard/:id"
          element={<UserDashBoard />}
        />
        <Route
          path="/dashboard/data/:id"
          element={<ScholarshipApplication />}
        />



{/* Recuriter  */}

{location.pathname.includes("/recruiter-dashboard") ? <Route element={<DashPage/>} path="/recruiter-dashboard"/> :""}
<Route path="/recruiter-login" element={<RecruiterLoginPage/>} />
<Route path="/recruiter-register" element={<RecruiterRegister/>}/>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
