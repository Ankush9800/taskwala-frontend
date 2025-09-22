import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CreateCont = createContext()

export const useMainContext = () => useContext(CreateCont);

export const MainContextProvider = ({children}) =>{
    const [systemData, setSystemData] = useState(null)
    const [responseTime, setResponseTime] = useState(0)

    const systemHealth = async()=>{
        const start = performance.now()
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getsystem`)
        const duration = performance.now() - start
        setResponseTime(Math.floor(duration))
        console.log(res.data)
        setSystemData(res.data)
        return res.data
    }

    useEffect(()=>{
        systemHealth()
    },[])

    return(
        <CreateCont.Provider value={{
            systemData,
            responseTime
        }}>
            {children}
        </CreateCont.Provider>
    )
}