import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authSlice";

function Protected({children}){
    const user = useSelector(selectLoggedInUser)

    if(!user){  // redirecting
        return <Navigate to='/login'></Navigate>
    }
    return children
}

export default Protected;