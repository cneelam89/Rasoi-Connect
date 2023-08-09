import React ,{lazy,Suspense} from "react";
import ReactDOM from 'react-dom/client';
import Body from "./src/components/Body";
import Header from "./src/components/Header";
import {createBrowserRouter,Outlet,RouterProvider,Outlet} from "react-router-dom";
import About from "./src/components/About";
import Contact from "./src/components/Contact";
import ResturantMenu from './src/components/ResturantMenu';

const Grocery=lazy(()=>import ("./src/components/Grocery"));

const AppLayout=() =>
{return ( <div className='app'>
        <Header/>
        <Outlet/>
    </div>);
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
