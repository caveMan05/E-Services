import React, { useContext, useEffect,useState } from 'react'
import { AuthContext } from '../store/ContextApi'
import {toast} from "react-toastify"
import { Link } from 'react-router-dom'


export default function AdminUsers() {
  const {token}=useContext(AuthContext)
  const[users,setUsers]=useState([])
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        
        const response=await fetch("http://localhost:5000/admin/users",{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${token}`
          }

        })
        const res_data=await response.json()
        if(response.ok){
          setUsers(res_data)
        }
        

      }catch(error){
        console.log("admin all user fetching error",error)
      }
    }
    fetchData()
  },[users]) // set to users so that whenever a user is deleted it is updated automatically

  const handleClick=async(id)=>{
    try{
      const response=await fetch(`http://localhost:5000/admin/deleteuser/${id}`,{
        method:"DELETE",
        headers:{
          "Authorization":`Bearer ${token}`
        }
      
        
      })
      const res_data=await response.json()
      if(response.ok){
        toast.success(res_data.message)
      }
      else{
        toast.error(res_data.message)
      }
    }catch(error){
      console.log(error)
    }
    
  }
  return (
    <>
      <section className='admin-users-section'>
        <div className='container'>
          <h1>Admin Users Data</h1>
        </div>
        <div className='container admin-users'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user,index)=>{
                return(
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td><Link className='updateLink' to={`/admin/users/${user._id}/edit`} >Edit</Link></td>
                    <td><button onClick={()=>{handleClick(user._id)}}>Delete</button></td>
                  </tr>
                );
              })}

            </tbody>

          </table>
          
        </div> 
      </section>
    </>
  )
}
