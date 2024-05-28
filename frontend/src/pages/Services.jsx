import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../store/ContextApi'
import {NavLink, useNavigate} from "react-router-dom"
import ServicesBuy from './ServicesBuy'

export default function Services() {
  const navigate=useNavigate()
  
  const {isLoggedIn}=useContext(AuthContext)
  const [services,setServices]=useState([])
  
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await fetch("http://localhost:5000/api/services",{
          method:"GET"

        })
        const res_data=await response.json()
        setServices(res_data)
        
      }catch(error){
        console.log("services fetching error")
      }
    }
    fetchData()
  },[])
  if(!isLoggedIn){
    return(
      <section className='section-services'>
        <div className='container'>
          <h1>Login first to see Services</h1>
        </div>
        <div className='container'>
          <div className="btn btn-group">
            <NavLink to="/login">
                  <button className="btn">Already a User</button>
            </NavLink>
            <NavLink to="/register">
              <button className="btn secondary-btn">New User</button>
            </NavLink>
          </div>
        </div>
      </section>
    )
  }
  const handleClick=(id)=>{
    navigate(`/buyservice/${id}`)
  }
  
  return (
    <>
      <section className='section-services'>
        <div className='container'>
          <h1 className='main-heading'>Services</h1>
        </div>
        <div className='container grid grid-three-cols'>
          {services.map((item,index)=>{
            return(
              <div className='card' key={index} onClick={()=>handleClick(item._id)}>
                <div className='card-img'>
                  <img src='/images/design.png' alt='designer' width="200"/>
                </div>
                <div className='card-details'>
                  <div className='grid grid-two-cols'>
                    <p>{item.provider}</p>
                    <p>{item.price}</p>
                  </div>
                  <h2>{item.service}</h2>
                  <p>{item.description}</p>
                </div>
                
                    
              </div>
            );
          })}
        </div>
      </section>
    </>
  )
}
