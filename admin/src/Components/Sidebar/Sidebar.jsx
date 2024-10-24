// import React from 'react'
// import './Sidebar.css'
// import {Link} from 'react-router-dom'
// import add_product_icon from '../../assets/nav-logo.png'
// import list_product_icon from '../../assets/nav-product.png'

// const Sidebar = () => {
//   return (
//     <div className='sidebar'>
//         <Link to={'/addproduct'} style={{textDecoration:"none"}}>
        
//         <div className="sidebar-item">
//             <img src={add_product_icon} alt="" />
//             <p>Add Product</p>  <br />
//             <img src={list_product_icon} alt="" />
//             <p>list product</p>

//         </div>
//         </Link>
//         <Link to={'/listproduct'} style={{textDecoration:"none"}}>  </Link>
        
      

//     </div>
//   )
// }

// export default Sidebar





import React from 'react'
import './Sidebar.css'
import add_product_icon from '../../assets/Product_Cart.svg';
import list_product_icon from '../../assets/Product_list_icon.svg';
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to='/addproduct' style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to='/listproduct' style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>Product List</p>
        </div>
      </Link>
      
    </div>
  )
}

export default Sidebar
