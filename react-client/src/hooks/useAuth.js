import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () =>
{
    const { auth } = useContext(AuthContext);
    useDebugValue(auth ? "Logged In" : "Logged Out");

    return useContext(AuthContext);
}

export default useAuth;