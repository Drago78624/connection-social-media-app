import React, { createContext, useState } from 'react'

export const AuthContext = createContext({
    uid: "",
    setUid: () => {}
})

const AuthContextProvider = ({children}) => {
    const [uid, setUid] = useState("dafddf")
  return (
    <AuthContext.Provider value={{uid, setUid}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider