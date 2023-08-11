import React ,{lazy,Suspense, useEffect,useState} from "react";
import ReactDOM from 'react-dom/client';
import Body from "./src/components/Body";
import Header from "./src/components/Header";
import {createBrowserRouter,Outlet,RouterProvider,Outlet} from "react-router-dom";
import About from "./src/components/About";
import Contact from "./src/components/Contact";
import ResturantMenu from './src/components/ResturantMenu';
import UserContext from "./src/utilits/UserContext";

const Grocery=lazy(()=>import ("./src/components/Grocery"));

const AppLayout=() =>{

const [userName,setUserName]=useState();

useEffect(()=>{
    const data={
        name:"Neelam",
    }
    setUserName(data.name)
},[]);

return (
    <UserContext.Provider value={{loggedInUser:userName, setUserName}}>
        <div className='app'>
        <Header/>
        {/* <UserContext.Provider value={{loggedInUser:"Neelam"}}> */}
        <Outlet/>
        {/* </UserContext.Provider> */}
    </div>
    </UserContext.Provider>
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
    ],
    errorElement: <Error />,},



])
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
