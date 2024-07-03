import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";


export default function Logout(){
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);  // doubt to be checked later done on own
    useEffect(()=> {
        dispatch(signOutAsync())
    })

    return(
        <>
        {/* but useeffect runs after render, so we have to delay the naviaget part */}
            {user && <Navigate to='/login' replace={true}></Navigate>}
        </>
    )
}

