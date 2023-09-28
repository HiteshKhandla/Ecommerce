import React, { useEffect } from 'react'
import useFetchCollection from '../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, store_products } from '../redux/slices/productSlice'
import ProductList from './ProductList'

const Products = () => {
    let {data,isLoading}=useFetchCollection("products")
    let dispatch=useDispatch()
    let products=useSelector(selectProducts)
    useEffect(()=>{
        dispatch(store_products({products:data}))
    },[data,dispatch])
  return (
    <div className='container'>
      <h1>Products </h1>
      <hr/>
      <ProductList products={products}/>
    </div>
  )
}

export default Products
