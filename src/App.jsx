import React from 'react'
import './App.css'
import LoginPage from './components/loginpage'

import SignupPage from './components/signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Homepage from './home/Homepage'
import Navbar from './components/navbar'
// import { Mycontext } from './components/context'
import Product from './components/product'
import Homepage from './components/Homepage'
import About from './components/about'
// import Footer from './components/footer'
import Cart from './components/cart'
// import ModernLoginPage from './components/loginpage'
import AdminHome from './pages/admin/admin'
import Userdetails from './pages/admin/userdetails'
// import Productdetails from './pages/admin/productdetails'
import AddProduct from './pages/admin/AddProduct'
import Productdetails from './pages/admin/productdetails'
import PaymentSectionPage from './components/payment'
import { Toaster } from 'react-hot-toast'
import CategorySection from './components/category'




function App() {

  return (
    <div>
      <Toaster/>
       <BrowserRouter>
       <Routes>
        
       <Route path='/'element={<Navbar/>}>
       <Route path='/'element={<Homepage/>}/>
       <Route path='/products'element={<Product/>}/>
       <Route path='/about'element={<About/>}/>
       <Route path='/cart' element={<Cart/>}/>
       <Route path='/category' element={<CategorySection/>}/>
       </Route>
       <Route path='signup' element={<SignupPage/>}/>
       <Route path='/admin' element={<AdminHome />} />
       <Route path='/adminproduct' element={<Productdetails/>}/>
       <Route path='/userdetails' element={<Userdetails />}/>
       
       <Route path='/productdetails' element={<Productdetails />}/>
       <Route path="/addproduct" element={<AddProduct />}/>
       <Route path='login' element={<LoginPage/>}/>
       <Route path='/payment' element={<PaymentSectionPage/>}/>
      
       </Routes>
       </BrowserRouter>
        
       
    </div>
  )
}


export default App
