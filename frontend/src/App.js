import './App.css';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home"
import Kontakt from "./pages/Kontakt"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Rezervacije from "./pages/Rezervacije"
import Single from "./pages/Single"
import Termini from "./pages/Termini"
import User from "./pages/User"
import Write from "./pages/Write"
import Navbar from './components/Navbar';
import Header from './components/Header';

const Layout = ()=>{
  return (
    <>
  <Header/>
  <Navbar/>
  <Outlet/>
  </>
);
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/",
    element: <Layout/>,
    children:[
  {
    path: "/",
    element: <Home/>
  },
  
  {
    path: "/kontakt",
    element: <Kontakt/>
  },
 
  {
    path: "/post/:id",
    element: <Single/>
  },
  {
    path: "/rezervacije",
    element: <Rezervacije/>
  },
  {
    path: "/termini",
    element: <Termini/>
  },
  {
    path: "/user",
    element: <User/>
  },
  {
    path:"/write",
    element: <Write/>
  }
]
}
]);



function App() {
  return (
    
    <div className='app'>
      <div className='container'>
    <RouterProvider router={router} />
      </div>
    </div>

  );
}



export default App;
