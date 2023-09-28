import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
        cartTotalAmount:0,
        cartTotalQuantity:0,
        previousURL:""
    },
    reducers:{
        ADD_TO_CART(state,action){  
        const productIndex=state.cartItems.findIndex((item)=>item.id==action.payload.id)
        if(productIndex!= -1){
            // item already exists 
            if(state.cartItems[productIndex].cartQuantity < state.cartItems[productIndex].countInStock){
                state.cartItems[productIndex].cartQuantity += 1
                // toast.success(`${action.payload.name} qty increased by 1 in cart`)
            }
            else{
                toast.info(`${action.payload.name} only ${action.payload.countInStock} qty available`)}
        }
        else{
            state.cartItems.push({...action.payload,cartQuantity:1})
            toast.success(`${action.payload.name} added to cart`)
        }
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },

        DECREASE_CART(state,action){
            const productIndex=state.cartItems.findIndex((item)=>item.id==action.payload.id)
            if(productIndex!= -1){
                if(state.cartItems[productIndex].cartQuantity > 1){
                    state.cartItems[productIndex].cartQuantity -= 1
                    // toast.success(`${action.payload.name} qty decreased by 1 in cart`)
                }
                else{
                    state.cartItems[productIndex].cartQuantity = 1 } }
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems))

        },
        REMOVE_FROM_CART(state,action){
            state.cartItems.splice(action.payload,1)
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        CLEAR_CART(state,action){  state.cartItems=[]; toast.success('cart empty')
    localStorage.removeItem('cartItems')},

        CALCULATE_SUBTOTAL(state,action){
            const array=[]
            state.cartItems.map((item)=>{
                const {price,cartQuantity}=item
                const cartItemAmount=price*cartQuantity
                return array.push(cartItemAmount)
            })
            const totalAmount=array.reduce((a,b)=>a+b,0)
            state.cartTotalAmount=totalAmount
        },
        CALCULATE_TOTALQuantity(state,action){
            const array=[]
            state.cartItems.map((item)=>{
                const {cartQuantity}=item
                const qty=cartQuantity
                return array.push(qty)
            })
            const totalQuantity=array.reduce((a,b)=>a+b,0)
            state.cartTotalQuantity=totalQuantity
        },
        SAVE_URL(state,action){
            state.previousURL=action.payload
        }
    }
})
export const {ADD_TO_CART,DECREASE_CART,REMOVE_FROM_CART,CLEAR_CART,CALCULATE_SUBTOTAL,CALCULATE_TOTALQuantity,SAVE_URL}=cartSlice.actions
export default cartSlice
export const selectCartItems=(state)=>state.cart.cartItems
export const selectCartTotalAmount=(state)=>state.cart.cartTotalAmount
export const selectCartTotalQuantity=(state)=>state.cart.cartTotalQuantity
export const selectURL=(state)=>state.cart.previousURL