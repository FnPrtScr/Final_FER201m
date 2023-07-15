import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../components/login.component";
import SignUp from "../components/signup.component";
import Verify from "../components/Verify.component";
import Home from "../components/Home.component";
import Noti from "../components/Noti.component";

export const appRoutes = createBrowserRouter([
    {
        path: '',
        element: <Navigate to='/api/v1/auth' />
    },
    {
        path: '/api/v1/auth',
        element: <Login />
    },
    {
        path:'/api/v1/sign-up',
        element: <SignUp/>
    },
    {
        path:'/api/v1/verify',
        element: <Verify/>
    },
    {
        path: '/api/v1/app',
        element: <Home />
    },
    {
        path: '/api/v1/app/viewallnotification',
        element: <Noti/>
    },
    // {
        
    //     path: 'admin/api/v1/app/',
    //     element: <DashBoardAdmin/>
    // }
    
])