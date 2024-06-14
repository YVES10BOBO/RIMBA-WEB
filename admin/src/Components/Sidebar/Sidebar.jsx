import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/nav-logo.svg'
import list_product_icon from '../../assets/nav-logo.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
        
        <div className="sidebar-item">
            <img src={add_product_icon} alt="" />
            <p>Add Product</p>
        </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:"none"}}>  </Link>
        
      

    </div>
  )
}

export default Sidebar