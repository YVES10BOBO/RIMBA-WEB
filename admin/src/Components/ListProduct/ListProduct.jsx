import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/nav-logo.svg'
// import { application } from 'express';

const ListProduct = () => {
  const[allproducts,setAllProducts] = useState([]);

  const fetchInfo = async ()=>{
    await fetch('http://localhost:4000/allproducts').then((res)=>res.json().then((data)=>{setAllProducts(data)})); 
  }


useEffect(()=>{
  fetchInfo();
},[])

const remove_product = async (id)=>{
  await fetch('http://localhost:4000/removeproduct',{
    method:'POST',
    headers:{
      Accept:'application/json',
      'Conte-Type':'application/json',
    },
    body:JSON.stringify({id:id})

  })
  await fetchInfo();
}
  return (
    <div className='list_product'>

        <div className='listproduct-format-main'>

          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>NEW Price</p>
          <p>Old Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className='listProduct-allproduts'>
          <hr />
          {allproducts.map((product,index)=>{
            return <div key={index} className='listproduct-format-main listproduct-format'>
              
              <p>${product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>${product.category}</p>
              <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />



            </div>
          })}
        </div>
    </div>
  )
}

export default ListProduct