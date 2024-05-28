import React, { useContext, useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { AuthContext } from '../store/ContextApi'
import {toast} from "react-toastify"


export default function AdminUpdate() {
  const {id}=useParams()
  const {token}=useContext(AuthContext)
  const navigate=useNavigate()
  
  const [user,setUser]=useState({
    username: "",
    email:"",
    phone:""
  })

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await fetch(`http://localhost:5000/admin/userinfo/${id}`,{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        const res_data=await response.json()
        //console.log(response)
        setUser(res_data)

      }catch(error){
        console.log("frontend fetching error")
      }
    }
    fetchData()
  },[id])

  
  const handleInput=(e)=>{
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })

  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const response=await fetch(`http://localhost:5000/admin/updateuser/${id}`,{
        method:"PATCH",
        headers:{
          "Content-type":"application/json",
          "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(user)
      })
      const res_data=await response.json()
      //console.log(res_data,response)
      if(response.ok){
        toast.success(res_data.message)
        navigate("/admin")
      }
      else{
        toast.error("No changes made")
      }

      

    }catch(error){
      console.log(error)
    }

  }
  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
            
              <div className="registration-form">
                <h1 className="main-heading mb-3">Admin update user</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="username"
                      required
                    />
                  </div>
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
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder='phone number'
                      required
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};


