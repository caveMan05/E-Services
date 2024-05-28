import React, { useState,useContext} from 'react'
import { AuthContext } from '../store/ContextApi'
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'

export default function Contact() {
  const{user}=useContext(AuthContext)
  const navigate=useNavigate()
  const[contact,setContact]=useState({
    username:user.username||"",
    email:user.email||"",
    message:""

  })
  const handleInput=(e)=>{
    setContact({
      ...contact,
      [e.target.name]:e.target.value
    })

  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const response=await fetch("http://localhost:5000/api/sendmessage",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(contact)
      })
      const res_data=await response.json()
      if(response.ok){
        toast.success("Message sent successfully")
        navigate("/")
      }

    }catch(error){
      console.log("frontend message sending error")
    }


  }
  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="we are always ready to help" />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112125.90662770208!2d77.17219591140747!3d28.571727056817572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce859a91a978b%3A0xdcce4fceb1142e3b!2sAdvant%20Navis%20Business%20Park!5e0!3m2!1sen!2sin!4v1715685042364!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
}
