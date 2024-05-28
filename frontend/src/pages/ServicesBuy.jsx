import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../store/ContextApi';
import {toast} from "react-toastify"


export default function ServicesBuy() {
  const navigate=useNavigate()
  const[data,setData]=useState(null)
  const{user}=useContext(AuthContext)
  const {id}=useParams()
  useEffect(()=>{
    const fetchData=async()=>{
      const response=await fetch(`http://localhost:5000/api/singleservice/${id}`,{
        method:"GET"
      })
      const res_data=await response.json()
      //console.log(response)
      if(response.ok){
        
        setData(res_data)
      }
    }
    fetchData()
  },[id])
  if(!data){
    return(
      <h1>Loading!!</h1>
    )
  }

  const handleClick=async(e)=>{
    let amt=data.price
    amt=amt.replace("Rs", "").trim()
    amt=Number(amt)
    const amount=amt*100
    const currency="INR"
    const rec_Id=Math.floor(Math.random()*10000000)
    const receiptId=rec_Id.toString()
    e.preventDefault()
    const response=await fetch("http://localhost:5000/payment/order",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        amount,currency,receipt:receiptId
      })
    })
    const res_data=await response.json()
    //console.log(res_data)
    var option={
      key:"",
      amount,currency,
      name:data.provider,
      description:data.service,
      image:"https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg",
      order_id:res_data.id,
      handler:async function(resposne){
        const paymentData={...resposne}
        const validateResponse=await fetch("http://localhost:5000/payment/validate",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(paymentData)
        })
        const res_data=await validateResponse.json()
        //console.log("validate data",res_data)
        if(res_data){
          const oId=res_data.orderId
          const pId=res_data.paymentId
          
          sendPaymentInfo(oId,pId)

        }
      },
      prefill:{
        name:user.username,
        email:user.email,
        contact:user.phone
      },
      notes:{
        address:"null"
      },
      theme:{
        color:"#0C0D0D"
      }
    };
    var rzp1=new Razorpay(option)
    rzp1.on("payment.failed",function(response){
      toast.error("payment failed")
    })
    rzp1.open()

    const sendPaymentInfo=async(orderId,paymentId)=>{
      try{
        const data={orderId, paymentId, amount: `${(amt)} INR`,serviceId:id,userId:user._id}
        console.log("payment sent data ",data)
        const response = await fetch("http://localhost:5000/payment/paymentInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        const info = await response.json()
        if(response.ok){
          toast.success(info.message)
          //console.log("db payment info ", info)
          navigate("/")
        }

      }catch(error){
        console.log(error)
      }
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
                  <h1 className="main-heading mb-3">Buy Service</h1>
                  <br />
                  <h2>Service : {data.service}</h2>
                  <h2>Description : {data.description}</h2>
                  <h2>Price : {data.price}</h2>
                  <h2>Provider : {data.provider}</h2>
                  <button className='btn' onClick={handleClick}>Buy Now</button>
                  
                  
                </div>
              </div>
            </div>
          </main>
        </section>
      </>
    );
  };
  