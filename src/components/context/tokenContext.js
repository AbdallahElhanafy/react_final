import {createContext, useState} from "react";

export let tokenContext = createContext();


export default function UserTokenProvider (props) {
    const [userToken, setToken] = useState(null)
    return <tokenContext.Provider value={{userToken, setToken}} >
        {props.children}
    </tokenContext.Provider>
}