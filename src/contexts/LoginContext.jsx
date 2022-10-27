import { createContext, useState, useEffect } from "react"

const LoginContext = createContext()

const LoginProvider = ({ children }) => {

    const [account, setAccount] = useState("")
    const [loginStatus, setLoginStatus] = useState()
  
    useEffect(() => {
      setAccount(localStorage.getItem("account"))
      setLoginStatus(localStorage.getItem("loginStatus") === "true")
    }, [account, loginStatus])
  
    useEffect(() => {
      if (loginStatus) {
        localStorage.setItem("account", account);
        localStorage.setItem("loginStatus", loginStatus)
      }
    }, [account, loginStatus])
  
    return (
      <LoginContext.Provider
        value={{
          account,
          setAccount,
          loginStatus,
          setLoginStatus
        }}
      >
        {children}
      </LoginContext.Provider>
    )
  }
  
  export { LoginContext, LoginProvider }