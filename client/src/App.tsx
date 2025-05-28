import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";


const router = createBrowserRouter([
  {
    path:'/',
    element:<RootLayout/>,
    children:[
      {
        index:true,
        element:<Login/>
      },{
        path:'/login',
        element:<Login/>
      },{
        path:'/register',
        element:<Register/>
      },{
        path:'/home',
        element:<Home/>
      },{
        path:'/profile',
        element:<Profile/>
      }
    ]
  }
]);

const App = () =>{
  return <RouterProvider router={router}/>;
};

export default App;