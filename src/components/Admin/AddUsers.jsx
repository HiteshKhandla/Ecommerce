import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../Loader'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase/config'


let initialState={
    id:"",name:"",email:"",mobile:"",password:"",role:"",
}

let role=[
{id:1,role:"users"},
{id:1,role:"admin"},

]
const AddUsers = () => {
    const [user,setUser]=useState({...initialState})
    
   let [isLoading,setIsLoading]=useState()

    let navigate=useNavigate()
    



let handleSubmit=(e)=>{
    e.preventDefault()
    setIsLoading(true )
   navigate('/admin/viewusers')
   toast.success("navigate")
   try{
    // setIsLoading(true)
    // alert(JSON.stringify(form))
    const docRef=addDoc(collection(db,"users"),{
      name:user.name,
      email:user.email,
      phone:user.phone,
      address:user.address,
      password:user.password,
      confirmpassword:user.confirmpassword,
      role:user.role,
      createdAt:Timestamp.now().toDate()
    });
    setIsLoading(false)
toast.success("User Are Added")
navigate('/admindas/Viewuser')


}catch{
          setIsLoading(false)
        }
}

  return (
    <>
<div className='col-8'>
{isLoading && <Loader/>}
    <h1>Add User</h1>
    <hr />
    <form onSubmit={handleSubmit}>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control" name="name" id="formId1" placeholder="" value={user.name}
     onChange={(e)=> setUser({...user,name:e.target.value})}/>
      <label for="formId1">Name</label>
    </div>

    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control" name="email" id="formId1" placeholder="" value={user.email}
        onChange={(e)=>setUser({...user,email:e.target.value})}/>
      <label for="formId1">Email</label>
    </div>

    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control" name="mobile" id="formId1" placeholder="" value={user.mobile}
        onChange={(e)=>setUser({...user,mobile:e.target.value})}/>
      <label for="formId1">Mobile</label>
    </div>

    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control" name="password" id="formId1" placeholder="" value={user.password}
        onChange={(e)=>setUser({...user,password:e.target.value})}/>
      <label for="formId1">Password</label>
    </div>

    <div class="mb-3">
          <label for="" class="form-label">Role</label>
          <select class="form-select form-select-lg" name="role" value={user.role}
          onChange={(e)=>setUser({...user,role:e.target.value})} >
            <option selected>Select Role</option>
            {role.map((u,index)=><option key={index}>{u.role}</option>)}
          </select>
        </div>

        <div class="d-grid gap-2">
          <button type="submit" name="" id="" class="btn btn-primary">Add Users</button>
        </div>

        </form>
        </div>
    </>
  )
}

export default AddUsers

