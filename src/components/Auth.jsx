import React, { Fragment } from 'react';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import {Route, Routes, Navigate} from 'react-router-dom';
import MyOrder from './Myorder/MyOrder';
import Admingifts from './Admingifts/Admingifts';
import DisplayUser from './UserManagement/DisplayUser';
import RequireAuth from './Assets/RequireAuth';
import { useAuthCxt } from './Assets/auth-context';
import ProductList from "./Homepage/ProductList";
import Cart from "./Myorder/Cart"; 
import HomePage from './Homepage/Homepage.jsx';
import AdminOrders from "./Admingifts/AdminOrders";
import AdminThemes from "./Adminthemes/Adminthemes";

const Auth = () => {
    const authCxt = useAuthCxt();
    return (


        <Fragment>
        
         <Routes>
         <Route path="/Signup" element={<Signup/>}>  </Route>  
         <Route path="/"  element={<Navigate to="/Login"/>}>   </Route>
         <Route index path="/Login" element={<Login />} />

        

         <Route path="/*" element={<HomePage />}>
           <Route element={<RequireAuth role={authCxt.isLogged} />}>
            <Route path="Homepage" element={<ProductList />}> </Route>
            <Route path="Cart/*" element={<Cart/>}> </Route>
            <Route path="MyOrders/*" element={<MyOrder />}> </Route>
          </Route> 

          <Route element={<RequireAuth role={authCxt.isAdmin} />}>
            <Route path="Admingifts"  element={<Admingifts/>}>  </Route>
            <Route path="admin/orders/*" element={<AdminOrders/>}/>
            <Route path="admin/themes/*" element={<AdminThemes/>}/>
            <Route path="admin/users-list/*" element={<DisplayUser/>}/>
          </Route>
          </Route>

        </Routes>
        </Fragment>

        ); 
    }
    
    export default Auth;