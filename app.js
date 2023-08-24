import React ,{lazy,Suspense, useEffect,useState} from "react";
import ReactDOM from 'react-dom/client';
import Body from "./src/components/Body";
import Header from "./src/components/Header";
import {createBrowserRouter,Outlet,RouterProvider,Outlet} from "react-router-dom";
import About from "./src/components/About";
import Contact from "./src/components/Contact";
import ResturantMenu from './src/components/ResturantMenu';
import UserContext from "./src/utilits/UserContext";
import appStore from "./src/utilits/appStore";
import { Provider } from "react-redux";
import Cart from "./src/components/Cart"
import LoginReg from "./src/components/LoginReg";
import SendPasswordResetEmail from "./src/components/SendPasswordResetEmail";
import ResetPassword from "./src/components/ResetPassword"
import Profile from "./src/components/Profile"
import ChangePassword from "./src/components/ChangePassword"


const Grocery=lazy(()=>import ("./src/components/Grocery"));

const AppLayout=() =>{
const [userName,setUserName]=useState();
const [userEmail,setUserEmail]=useState();

useEffect(()=>{
    const data={
        name:"Neelam",
        email:"neelam@gmail.com"
    }
    setUserName(data.name)
    setUserEmail(data.email)
},[]);

return (
    <Provider store ={appStore}>
    <UserContext.Provider value={{loggedInUser:userName, email:userEmail, setUserName}}>
        <div className='app'>
        <Header/>
        {/* <UserContext.Provider value={{loggedInUser:"Neelam"}}> */}
        <Outlet/>
        {/* </UserContext.Provider> */}
    </div>
    </UserContext.Provider>
    </Provider>
    );
};

const appRouter=createBrowserRouter([
    {path: '/',
    element:<AppLayout/>,
    children:[
        {path:'/',
        element:<Body/>},
        {path:'/resturant/:resId',
        element:<ResturantMenu/>},
        {path:"/about",
        element: <About/>},
        {path:"/contact",
        element: <Contact/>},
        {path:"/grocery",
        element: <Suspense fallback={<h1> loading....</h1>}><Grocery /></Suspense> },
        {path:"/cart",
        element: <Cart/>},
        {path:"/login",
        element: <LoginReg/>},
        {path:"/sendpasswordresetemail",
        element: <SendPasswordResetEmail/>},
        {path:"/resetpassword",
         element:<ResetPassword/>},
        {path:"/profile",
        element:<Profile/>},
        {path:"/changepassword",
        element:<ChangePassword/>},

    ],
    errorElement: <Error />,},

])
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
