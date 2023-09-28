import React, { useEffect } from 'react'
import {FaHome,FaAddressBook,FaPhoneAlt, FaPenSquare, FaShoppingBasket, FaShoppingCart, FaUserAlt} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {  onAuthStateChanged, signOut } from "firebase/auth";
import {auth, db} from '../firebase/config'
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser, LogoutUser, selectUserName, selectUserRole } from '../redux/slices/authSlice';
import { ShowOnLogin, ShowOnLogout } from './HiddenLinks';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import { selectCartItems } from '../redux/slices/cartSlice';
const Header = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const userrole=useSelector(selectUserRole)
    const username=useSelector(selectUserName)
    const cartItems=useSelector(selectCartItems)
    useEffect(()=>{
        onAuthStateChanged(auth, async(user) => {
            if (user) {
              const uid = user.uid; 
              let username=user.email.slice(0,-10)
              const ref=doc(db,"users",uid)
              let docSnap=await getDoc(ref);
              if(docSnap.exists()){
                    let role= docSnap.data().role
                dispatch(LoginUser({userID:uid,userEmail:user.email,userName:username,userRole:role}))
              }
            } else {dispatch(LogoutUser())  }
          });
    })
    let handleLogout=()=>{
        signOut(auth).then(() => {
            toast.success('loggedout'); navigate('/')}).catch((error) => {
           toast.error(error.message) });
    }
  return (
   <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
       <a class="navbar-brand" href="#">Ecommerce</a>
       <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
           aria-expanded="false" aria-label="Toggle navigation"></button>
       <div class="collapse navbar-collapse" id="collapsibleNavId">
           <ul class="navbar-nav me-auto mt-2 mt-lg-0">
               <li class="nav-item">
                   <a class="nav-link active" href="#" aria-current="page">
                   <Link to='/'  class="nav-link">
                    <FaHome/> Home <span class="visually-hidden">(current)</span>
                    </Link></a>
               </li>
               <li class="nav-item">
                   <a class="nav-link" href="#">
                   <Link to='/products'  class="nav-link">
                    <FaShoppingBasket/> Products</Link></a>
               </li>
               <li className="nav-item">
                   <a className="nav-link" href="#">
                   <Link to='/aboutus'  className="nav-link">
                    <FaAddressBook/> About Us</Link></a>
               </li>
               <li className="nav-item">
                   <a className="nav-link" href="#">
                   <Link to='/contactus'  className="nav-link">
                    <FaPhoneAlt/> Contact Us</Link></a>
               </li>
           </ul>
           <form class="d-flex my-2 my-lg-0">
               <input class="form-control me-sm-2" type="text" placeholder="Search"/>
               <button class="btn btn-danger my-2 my-sm-0" type="submit">Search</button>
           </form>
           <ul class="navbar-nav mt-2 mt-lg-0">
            {userrole != 'admin'  &&
           <li class="nav-item">
                   <a class="nav-link" href="#" aria-current="page"> 
                   <Link to='/cart'  class="nav-link">
                    Cart<FaShoppingCart size={30}/>
                    <span class="badge rounded-pill text-bg-danger"
                    style={{position:'relative',top:'-10px'}}>
                        {cartItems.length}
                    </span>
                     </Link> </a> </li>
                    }
            <ShowOnLogout>
               <li class="nav-item">
                   <a class="nav-link" href="#" aria-current="page"> 
                   <Link to='/register'  class="nav-link">
                   <FaPenSquare/> Register</Link> </a> </li>
               <li class="nav-item">
                   <a class="nav-link" href="#">
                    <Link to='/login'  class="nav-link">
                    <FaUserAlt/> Login
                    </Link>                
                    </a>
               </li>
               </ShowOnLogout>
            <ShowOnLogin>
               <li class="nav-item">
                   <a class="nav-link" href="#">
                    <a  class="nav-link">
                    Welcome {username}
                    </a>
                   
                    </a>
               </li>
               <li class="nav-item">
                   <a class="nav-link" href="#">
                    <button class="nav-link" onClick={handleLogout}> 
                    Logout
                    </button>
                   
                    </a>
               </li>
            </ShowOnLogin>
           </ul>
       </div>
   </nav>
  )
}

export default Header
