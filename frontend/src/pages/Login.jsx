import React from 'react'
import { useState,useContext } from 'react'
import { AuthContext } from '../store/ContextApi'
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"

export default function Login() {
  const navigate=useNavigate()
  const {tokeninLs}=useContext(AuthContext)
  const [user,setUser]=useState({
    email:"",
    password:""
  })

  const handleInput=(e)=>{
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })

  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const response=await fetch("http://localhost:5000/api/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(user)
    })
    const res_data=await response.json()
    //console.log(res_data)
    if(response.ok){
      tokeninLs(res_data.token)
      toast.success(res_data.message)
      navigate("/")
    }
    else{
      toast.error(res_data.message)
    }



  }
  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                      required
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
