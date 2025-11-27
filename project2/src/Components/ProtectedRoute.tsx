import { useSelector } from "react-redux"
import type { RootState } from "../Redux";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
function ProtectedRoute(props:{children:ReactNode}) {
      const { isAuthenticated } = useSelector((s: RootState) => s.auth);
     if(isAuthenticated){
          return props.children;
     }
     else{
            return<Navigate to="/login" replace  />
     }

 
}

export default ProtectedRoute