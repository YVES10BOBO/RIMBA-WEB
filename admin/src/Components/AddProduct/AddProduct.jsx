// import React, { useState } from 'react';
// import './AddProduct.css';
// import upload_area from '../../assets/upload_area.svg';
// // import { backend_url } from "../../App";

// const AddProduct = () => {
//     const [image, setImage] = useState(false);
//     const [productDetails, setProductDetails] = useState({
//         name: "", 
//         image: "",
//         category: "women",
//         new_price: "",
//         old_price: "",
//     });

//     const imageHandler = (e) => {
//         setImage(e.target.files[0]);
//     };

//     const changeHandler = (e) => {
//         setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
//     };

//     const AddProduct = async () => {
//         console.log(productDetails);
//         try {
//             const formData = new FormData();
//             formData.append('product', image);
//             const uploadResponse = await fetch('http://localhost:4000/upload', {
//                 method: 'POST',
//                 body: formData,
//             });
//             const uploadData = await uploadResponse.json();

//             if (uploadData.success) {
//                 const product = { ...productDetails, image: uploadData.image_url };
//                 // console.log(product);
                
//                 await fetch('http://localhost:4000/addproduct', {
//                     method: 'POST',
//                     headers: {
//                         Accept: 'application/json',

//                         'Content-Type': 'application/json',
//                     },
//                     body:JSON.stringify(product),
//                 });
//             }
//         } catch (error) {
//             console.error('Error adding product:', error);
//         }
//     };

//     return (
//         <div className='add-product'>
//             <div className="addproduct-itemfield">
//                 <p>Product Title</p>
//                 <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
//             </div>

//             <div className="addproduct-itemprice">
//                 <div className="addproduct-itemfield">
//                     <p>Price</p>
//                     <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
//                 </div>
//                 <div className="addproduct-itemfield">
//                     <p>Offer price</p>
//                     <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
//                 </div>
//             </div>

//             <div className="addproduct-itemfield">
//                 <p>Product category</p>
//                 <select value={productDetails.category} name="category" className='add-product-selector'>
//                     <option value="women">Women</option>
//                     <option value="men">Men</option>
//                     <option value="kid">Kid</option>
//                 </select>
//             </div>

//             <div className="addproduct-itemfield">
//                 <label htmlFor="file-input">
//                     <img src={image ? URL.createObjectURL(image) : upload_area} alt="Upload" className='addproduct-thumbnail-img' />
//                 </label>
//                 <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
//             </div>

//             <button onClick={()=>{AddProduct()}} className='addproduct-btn'>ADD</button>
//         </div>
//     );
// };

// export default AddProduct;












// import React, { useState } from 'react';
// import './AddProduct.css';
// import upload_area from '../../assets/nav-logo.png';

// const AddProduct = () => {
//     const [image, setImage] = useState(null);
//     const [productDetails, setProductDetails] = useState({
//         name: "",
//         image: "",
//         category: "women",
//         new_price: "",
//         old_price: "",
//     });

//     const imageHandler = (e) => {
//         setImage(e.target.files[0]);
//     };

//     const changeHandler = (e) => {
//         setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
//     };

//     const addProduct = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('image', image);
//             const uploadResponse = await fetch('http://localhost:4000/upload', {
//                 method: 'POST',
//                 body: formData,
//             });
//             const uploadData = await uploadResponse.json();

//             if (uploadData.success) {
//                 const product = { ...productDetails, image: uploadData.image_url };
//                 await fetch('http://localhost:4000/addproduct', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(product),
//                 });
//             }
//         } catch (error) {
//             console.error('Error adding product:', error);
//         }
//     };

//     return (
//         <div className='add-product'>
//             <div className="addproduct-itemfield">
//                 <p>Product Title</p>
//                 <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
//             </div>

//             <div className="addproduct-itemprice">
//                 <div className="addproduct-itemfield">
//                     <p>Price</p>
//                     <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
//                 </div>
//                 <div className="addproduct-itemfield">
//                     <p>Offer price</p>
//                     <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
//                 </div>
//             </div>

//             <div className="addproduct-itemfield">
//                 <p>Product category</p>
//                 <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
//                     <option value="women">Women</option>
//                     <option value="men">Men</option>
//                     <option value="kid">Kid</option>
//                 </select>
//             </div>

//             <div className="addproduct-itemfield">
//                 <label htmlFor="file-input">
//                     <img src={image ? URL.createObjectURL(image) : upload_area} alt="Upload" className='addproduct-thumbnail-img' />
//                 </label>
//                 <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
//             </div>

//             <button onClick={()=>{AddProduct()}} className='addproduct-btn'>ADD</button>
//         </div>
//     );
// };

// export default AddProduct;




import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import { backend_url } from "../../App";

const AddProduct = () => {

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  const AddProduct = async () => {
    // console.log(productDetails); 

    let dataObj;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch(`${backend_url}/upload`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    }).then((resp) => resp.json())
      .then((data) => { dataObj = data });

    if (dataObj.success) {
        // console.log(product)
      product.image = dataObj.image_url;
      await fetch(`${backend_url}/addproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => { data.success ? alert("Product Added") : alert("Failed") });

    }
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  }

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" name="name" value={productDetails.name} onChange={(e) => { changeHandler(e) }} placeholder="Type here" />
      </div>
      <div className="addproduct-itemfield">
        <p>Product description</p>
        <input type="text" name="description" value={productDetails.description} onChange={(e) => { changeHandler(e) }} placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="number" name="old_price" value={productDetails.old_price} onChange={(e) => { changeHandler(e) }} placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="number" name="new_price" value={productDetails.new_price} onChange={(e) => { changeHandler(e) }} placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select value={productDetails.category} name="category" className="add-product-selector" onChange={changeHandler}>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Product image</p>
        <label htmlFor="file-input">
          <img className="addproduct-thumbnail-img" src={!image ? upload_area : URL.createObjectURL(image)} alt="" />
        </label>
        <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" id="file-input" accept="image/*" hidden />
      </div>
      <button className="addproduct-btn" onClick={() => { AddProduct() }}>ADD</button>
    </div>
  );
};

export default AddProduct;
