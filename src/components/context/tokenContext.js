import {createContext, useState} from "react";

export let tokenContext = createContext();



export default function UserTokenProvider (props) {

    const [userToken, setToken] = useState()

    return <tokenContext.Provider value={{userToken, setToken,}} >
        {props.children}
    </tokenContext.Provider>
}