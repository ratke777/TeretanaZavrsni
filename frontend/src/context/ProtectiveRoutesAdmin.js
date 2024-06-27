import { useContext } from "react"
import { AuthContext } from "./authContext"
import {Navigate} from 'react-router-dom'



const ProtectiveRoutesAdmin = ({children}) =>{
    const {currentUser} = useContext(AuthContext)
    if(!currentUser || currentUser.id!==4){
        return <Navigate to="/login"/>
    }
    return children;
}
export default ProtectiveRoutesAdmin