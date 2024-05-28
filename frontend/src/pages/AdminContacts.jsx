
import React, { useContext, useEffect,useState } from 'react'
import {AuthContext} from "../store/ContextApi"
import {toast} from "react-toastify"

export default function AdminContacts() {
  const {token}=useContext(AuthContext)
  const [contacts,setContacts]=useState([])
  useEffect(()=>{
    const fetchData=async()=>{
      const response=await fetch("http://localhost:5000/admin/contacts",{
        method:"GET",
        headers:{
          "Authorization":`Bearer ${token}`
        }

      })
      const res_data=await response.json()
      //console.log(res_data)
      setContacts(res_data)
    }
    fetchData()
  },[contacts])

  const handleDelete=async(id)=>{
    try{
      const response=await fetch(`http://localhost:5000/admin/deletecontact/${id}`,{
        method:"DELETE",
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      const res_data= await response.json()
      if(response.ok){
        toast.success(res_data.message)
      }
      else{
        toast.error("ERROR 404 ")
      }

    }catch(error){
      console.log(error)
    }
  }


  return (
    <>
      <section className='admin-contacts-section'>
        <h1>Admin Contact Data</h1>
        <div className='container admin-users'>
          {contacts.map((info,index)=>{
            const{username,email,message}=info
            return(
              <div className='contacts-layout' key={index}>
                <p>username : {username}</p>
                <p>Email : {email}</p>
                <p>Message : {message}</p>
                <button onClick={()=>{handleDelete(info._id)}} className='btn'>delete</button>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
