import React, { createContext, useEffect, useState } from 'react'
import { getAuthUid } from '../auth'
import getUserData from '../utils/getUserData'

export const UserContext = createContext({
    userData: {},
    setUserData: () => {}
})

const UserContextProvider = ({children}) => {
  const [userData, setUserData] = useState(null)
  const uid = getAuthUid()
  const initializeUserData = async () => {
    if(uid){
      const data = await getUserData(uid)
      setUserData(data)
    }
  }

  useEffect(() => {
    initializeUserData()
  }, [])
  return (
    <UserContext.Provider value={{userData, setUserData}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider