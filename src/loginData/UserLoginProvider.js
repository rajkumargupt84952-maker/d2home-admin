import React, { createContext, useState } from "react"

const UserLoginContext = createContext()
const UserLoginProvider = ({children })=>{
  const [userLoginData,setUserLoginData]= useState({name:"raj"})
  const [updatedOrder,setUpdatedOrder] = useState({})

  return (
    <UserLoginContext.Provider value={{userLoginData,setUserLoginData,setUpdatedOrder,updatedOrder}}>
           {children}
    </UserLoginContext.Provider>
  )

}
export {UserLoginContext,UserLoginProvider}