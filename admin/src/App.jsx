// // import React from 'react';
// import { BrowserRouter } from "react-router-dom";

// import Navbar from './Components/Navbar/Navbar';
// import Admin from './Pages/Admin/Admin';
// import Footer from "./Components/Footer/Footer";

// // import ListProduct from './Components/ListProduct/ListProduct';


// export const backend_url = 'http://localhost:4000';
// export const currency = '$';

// const App = () => {
//   return (
//     <BrowserRouter>

//     <div>
//       <Navbar />
//       <Admin/>
//       {/* <ListProduct/> */}
//       <Footer />
//     </div>
//     </BrowserRouter>

//   );
// }

// export default App;


// import { BrowserRouter } from "react-router-dom";
// import Footer from "./Components/Footer/Footer";
// import Navbar from "./Components/Navbar/Navbar";
// import Admin from "./Pages/Admin/Admin";

// export const backend_url = 'http://localhost:4000';
// export const currency = '$';

// function App() {
//   return (
//     <BrowserRouter>
//       <div>
//         <Navbar />
//         <Admin />
//         <Footer />
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;


import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from "./Components/Footer/Footer";
import Navbar from './Components/Navbar/Navbar';
import Admin from './Pages/Admin/Admin';
import AddProduct from './Components/AddProduct/AddProduct';
import ListProduct from './Components/ListProduct/ListProduct';

export const backend_url = 'http://localhost:4000';
export const currency = '$';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
