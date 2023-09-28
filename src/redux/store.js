import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import checkoutSlice from "./slices/checkoutSlice";

 const store=configureStore({
    reducer:{
            auth:authSlice.reducer,
            product:productSlice.reducer,
            cart:cartSlice.reducer,
            checkout:checkoutSlice.reducer,
    }
})
export default store