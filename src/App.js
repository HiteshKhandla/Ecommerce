import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Admin from './components/Admin/Admin'
import AddProduct from './components/Admin/AddProduct';
import ViewProducts from './components/Admin/ViewProducts';
import Products from './components/Products';
import ViewUser from './components/ViewUser';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import CheckoutDetails from './components/CheckoutDetails';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Checkout from './components/Checkout';

function App() {
  return (
    <>
    <ToastContainer autoClose={1000}/>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/aboutus' element={<AboutUs/>}/> 
      <Route path='/contactus' element={<ContactUs/>}/>

      <Route path='/admin' element={<Admin/>}>
          <Route path='addproduct' element={<AddProduct/>}/>
          <Route path='viewproducts' element={<ViewProducts/>}/>
          <Route path='viewuser' element={<ViewUser/>}/>
          <Route path='edit/:id'  element={<AddProduct/>}/>
      </Route>
      <Route path='/products' element={<Products/>}/>
      <Route path='/productdetails/:id' element={<ProductDetails/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/checkout-details' element={<CheckoutDetails/>}/>
      <Route path='/checkout' element={<Checkout/>}/>

      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    
    </>
  );
}

export default App;
