import React from 'react'
import './Admin.css'
// import Sidebar from '../../Components/sidebar/Sidebar'
// import {Link} from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import Sidebar from '../../Components/Sidebar/Sidebar'
import ListProduct from '../../Components/ListProduct/ListProduct'

const Admin = () => {
  return (
    <div className='admin'>
            <Sidebar/>
            <Routes>
            <Route path='/addproduct' element={<AddProduct/>}/>
            <Route path='/addproduct' element={<ListProduct/>}/>

            </Routes>
         

    </div>
  )
}

export default Admin