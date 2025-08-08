import { jwtDecode } from "jwt-decode";
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext=createContext()
const AuthProvider=({children})=>{
    const navigate=useNavigate()

    // initialize state from local storage
    const [token,setToken]=useState(()=>localStorage.getItem('token')|| '')
    const [user, setUser] = useState(() => {
        try {
          const stored = localStorage.getItem('user')
          return stored ? JSON.parse(stored) : null
        } catch (e) {
          console.error('Error parsing user from localStorage:', e)
          return null
        }
      })
      
    // Logout 
    const logout=useCallback(()=>{
        localStorage.clear()
        setToken('')
        setUser(null)
        navigate('/login')
    },[navigate])

    useEffect(()=>{
        if (token) {
            try {
                const decoded=jwtDecode(token);
                const isExpired=decoded.exp*1000 <Date.now()
                if (isExpired) {
                    logout()                    
                }
            } catch (error) {
                logout()
            }
        }
    },[token,logout])

    // return 
    return(
        <AuthContext.Provider value={{token,user,logout,setToken,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
export{AuthContext,AuthProvider}