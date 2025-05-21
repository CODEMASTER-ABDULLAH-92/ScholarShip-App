import gsap from 'gsap';
import React, { useRef } from 'react'
import Footer from './compoenent/Footer'
import Navbar from './compoenent/Navbar'
import { Route, Routes } from 'react-router-dom'
import Address from './pages/Address'

import Docs from "./pages/Docs"
import Education from "./pages/Education"
import Home from './pages/Home'
import PersonalDetail from './pages/Personal'
import LoginPage from './pages/Login'
import RegisterPage from './pages/register'
import { useEffect } from 'react'
import ScholarShips from './pages/ScholarShips'
import Details from './pages/Details'
const App = () => {
const homeRef = useRef();
  useEffect(()=>{
    gsap.fromTo(homeRef.current,{
      opacity:0,
    },{
      opacity:1,
      duration:1,
      scrollTrigger:{
        trigger:homeRef.current,
        scroller:"body",
      }
    })
  },[])


  return (
    <div ref={homeRef}>
      <Navbar/>
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/personal-Info' element={<PersonalDetail/>}/>
<Route path='/education' element={<Education/>}/>
<Route path='/docs' element={<Docs/>}/>
<Route path='/address' element={<Address/>}/>
<Route path='/login' element={<LoginPage/>}/>
<Route path='/register' element={<RegisterPage/>}/>
<Route path='/scholaships' element={<ScholarShips/>}/>
<Route path='/scholaships/:id' element={<Details/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App;