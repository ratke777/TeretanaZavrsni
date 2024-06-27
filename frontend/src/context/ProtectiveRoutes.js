import { useContext } from "react"
import { AuthContext } from "./authContext"
import {Navigate} from 'react-router-dom'



const ProtectiveRoutes = ({children}) =>{
    const {currentUser} = useContext(AuthContext)
    if(!currentUser){
        return <Navigate to="/login"/>
    }
    return children;
}
export default ProtectiveRoutes