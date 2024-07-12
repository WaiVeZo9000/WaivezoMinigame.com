import { Navigate } from "react-router";
import { useAuth } from "./AuthProvider";

interface Props{
    element : React.ComponentType;
}


const PrivateRoute:React.FC<Props> = ({element : Component}) => {

    const {isAuthenticated} = useAuth()

    return isAuthenticated ? <Component/> : <Navigate to='/login'/>;
}
 
export default PrivateRoute;