import React, { useEffect, useState } from 'react'
import CheckoutSummary from './CheckoutSummary'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUserEmail, selectUserID } from '../redux/slices/authSlice'
import { selectCartItems, selectCartTotalAmount } from '../redux/slices/cartSlice'
import { selectShippingAddress } from '../redux/slices/checkoutSlice'
import spinnerImg from '../assets/spinner.jpg'
import { toast } from 'react-toastify'
const CheckoutForm = () => {
    const [message,setMessage]=useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const stripe=useStripe()
    const elements=useElements()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const UserID=useSelector(selectUserID)
    const userEmail=useSelector(selectUserEmail)
    const cartItems=useSelector(selectCartItems)
    const totalAmount=useSelector(selectCartTotalAmount)
    const shippingAddress=useSelector(selectShippingAddress)

    useEffect(()=>{
        let clientSecret=new URLSearchParams(window.location.search).get("payment_intent_client_secret")
    },[stripe])

    let handleSubmit=async(e)=>{
        e.preventDefault()
        setMessage(null)
        setIsLoading(true)
        const paymentIntent=await stripe.confirmPayment({
            elements,
            confirmParams:{
                return_url:"http://localhost:3000/checkout-success"
            },
            redirect:"if_required"
        }).then((result)=>{
            if(result.error){
                toast.error(result.error)
                setMessage(result.message)
                return ;
            }
            if(result.paymentIntent){
                if(result.paymentIntent.status=="succeeded"){
                    setIsLoading(false)
                    toast.success("payment done")
                    //save order
                    navigate('/checkout-success')
                }
            }
        })
            setIsLoading(false)     
    }
  return (
    <div className='container mt-5'>
        <form onSubmit={handleSubmit}>
        <div className='row'>
            <div className='card col-5 m-2 shadow'>
                <CheckoutSummary/>
            </div>
            <div className='card col-5 m-2 shadow'>
                <PaymentElement id="payment_intent" ></PaymentElement>
                    <button type="submit" disabled={isLoading || !stripe || !elements} class="btn btn-primary mt-2">
                    <span>{isLoading ?<img src={spinnerImg} alt='loading' height='50px' />:<>(Pay Now)</> } </span>
                    </button>
            </div>
        </div>
        </form>
        <div>{message && <h3>{message}</h3>}</div>
    </div>
  )
}

export default CheckoutForm
