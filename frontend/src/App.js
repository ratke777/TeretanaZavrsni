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
import ProtectiveRoutes from './context/ProtectiveRoutes';
import AdminBlog from './pages/AdminBlog';
import ProtectiveRoutesAdmin from './context/ProtectiveRoutesAdmin';
import AdminKartica from './pages/AdminKartica';
import Trening from './pages/Trening';
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
    element: 
    <ProtectiveRoutes>
    <Home/>
    </ProtectiveRoutes>
  },
  {
    path:"/dodaj",
    element:
    <ProtectiveRoutesAdmin>
    
      <AdminBlog/>
    
    </ProtectiveRoutesAdmin>
  },
  {
    path:"/korisnici",
    element:
    <ProtectiveRoutesAdmin>
    
      <AdminKartica/>
    
    </ProtectiveRoutesAdmin>
  },
  {
    path:"/trening",
    element:
    <ProtectiveRoutesAdmin>
    
      <Trening/>
    
    </ProtectiveRoutesAdmin>
  },
 
  
  {
    path: "/kontakt",
    
    element:
    <ProtectiveRoutes>
    <Kontakt/>
    </ProtectiveRoutes>
  },
 
  {
    path: "/post/:id",
    element: 
    <ProtectiveRoutes>
    <Single/>
    </ProtectiveRoutes>
  },
  {
    path: "/rezervacije",
    element: <ProtectiveRoutes>
    <Rezervacije/>
    </ProtectiveRoutes>
  },
  {
    path: "/termini",
    element: 
    <ProtectiveRoutes>
    <Termini/>
    </ProtectiveRoutes>
  },
  {
    path: "/posts/:id",
    element: 
    <ProtectiveRoutes>
    <Single/>
    </ProtectiveRoutes>
  },
  {
    path: "/user",
    element: 
    <ProtectiveRoutes>
    <User/>
    </ProtectiveRoutes>
  },
  {
    path:"/write",
    element:
    <ProtectiveRoutes> <Write/>
    </ProtectiveRoutes>
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
