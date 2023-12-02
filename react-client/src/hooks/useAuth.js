import { useContext, useDebugValue } from "react";

import AuthContext from "../context/AuthProvider";

const useAuth = () =>
{
    const context = useContext(AuthContext);
    useDebugValue(context.auth ? "Logged In" : "Logged Out");

    return context;
}

export default useAuth;