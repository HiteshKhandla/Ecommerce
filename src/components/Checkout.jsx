import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotalAmount } from '../redux/slices/cartSlice'
import {selectShippingAddress} from '../redux/slices/checkoutSlice'
import {selectUserEmail} from '../redux/slices/authSlice'
import { Elements } from '@stripe/react-stripe-js'
import { toast } from 'react-toastify'
import CheckoutForm from './CheckoutForm'

const stripePromise=loadStripe('pk_test_51NtRAtSIVhn5JSm444iD3MeB2YQFC2b8XZbcvDt5qmGW2eZwq9mpEPVVZ8el8urhHUo4EJ6yPl2lt3L25CXQ4wn600GnOlU7Qk')

const Checkout = () => {
  const [message,setMessage]=useState("Initializing Checkout")
  let [clientSecret,setClientSecret]=useState("")
  const cartItems=useSelector(selectCartItems)
  const totalAmount=useSelector(selectCartTotalAmount)
  const shippingAddress=useSelector(selectShippingAddress)
  const userEmail=useSelector(selectUserEmail)
  const description=`ecommerce payment ${userEmail} , Amount:${totalAmount}`
useEffect(()=>{
  fetch("http://localhost:1000/payment",{
    method:"POST",
    headers:{'content-type':'application/json'},
    body:JSON.stringify({
  userEmail:userEmail,shipping:shippingAddress,amount:totalAmount,description:description
    })
   }).then((res)=>{
      return res.json().then((data)=>{
        setClientSecret(data.clientSecret)
      })
    }).catch((error)=>{
      setMessage("Failed to initialize checkout")
      toast.error("something went wrong")
    })
 
},[])

  const appearance={theme:'stripe'}
  const  options={clientSecret,appearance}
  return (
    <>
    <div className='container mt-3'>
      {!clientSecret && <h3>{message}</h3>}
    </div>
 
    { clientSecret &&  
      <Elements options={options} stripe={stripePromise}> 
        <CheckoutForm/>
      </Elements>
    }
      </>
  )
}

export default Checkout
