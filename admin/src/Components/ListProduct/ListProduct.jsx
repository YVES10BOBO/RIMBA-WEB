/* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from 'react'
// import './ListProduct.css'
// import cross_icon from '../../assets/cross_icon.png'
// // import { application } from 'express';

// const ListProduct = () => {

//   const[allproducts,setAllProducts] = useState([]);

//   const fetchInfo = async ()=>{
//     await fetch('http://localhost:4000/allproducts').then((res)=>res.json()).then((data)=>{setAllProducts(data)}); 
//   }


// useEffect(()=>{
//   fetchInfo();
// },[])

// const remove_product = async (id)=>{
//   await fetch('http://localhost:4000/removeproduct',{
//     method:'POST',
//     headers:{
//       Accept:'application/json',
//       'Content-Type':'application/json',
//     },
//     body:JSON.stringify({id:id})

//   })
//   await fetchInfo();
// }
//   return (
//     <div className='list_product'>
//       <h1>all products list </h1> 

//         <div className='listproduct-format-main'>

//           <p>Products</p>
//           <p>Title</p>
//           <p>Old Price</p>
//           <p>NEW Price</p>
//           <p>Category</p>
//           <p>Remove</p>
//         </div>
//         <div className='listProduct-allproduts'>
//           <hr />
//           {allproducts.map((product,index)=>{
//             return <>
//             <div key={index} className='listproduct-format-main listproduct-format'>
//             <img className='listproduct-product-icon' src={product.image} alt="" />

//               <p>${product.name}</p>
//               <p>${product.old_price}</p>
//               <p>${product.new_price}</p>
//               <p>${product.category}</p>
//               <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
             
//             </div>
//             <hr/>
//             </> 
//           })}
//         </div>
//     </div>
//   )
// }

// export default ListProduct



import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../../assets/cross_icon.png'
import { backend_url, currency } from "../../App";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = () => {
    fetch(`${backend_url}/allproducts`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  const removeProduct = async (id) => {
    await fetch(`${backend_url}/removeproduct`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    })

    fetchInfo();
  }

  return (
    <div className="listproduct">
      <h1>All Products Liist</h1>
      <div className="listproduct-format-main">
        <p>Products</p> <p>Title</p> <p>Old Price</p> <p>New Price</p> <p>Category</p> <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((e, index) => {
          return<>
          <div key={index}>
            <div className="listproduct-format-main listproduct-format">
              <img className="listproduct-product-icon" src={backend_url + e.image} alt="" />
              <p className="cartitems-product-title">{e.name}</p>
              <p>{currency}{e.old_price}</p>
              <p>{currency}{e.new_price}</p>
              <p>{e.category}</p>
              <img className="listproduct-remove-icon" onClick={() => { removeProduct(e.id) }} src={cross_icon} alt="" />
            </div>
            <hr />
            
          </div>
          </>
        })}
      </div>
    </div>
  );
};

export default ListProduct;

