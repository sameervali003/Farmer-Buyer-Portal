import { createContext, useState, useEffect } from "react"

const LoginContext = createContext()

const LoginProvider = ({ children }) => {

    const [account, setAccount] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
  
    useEffect(() => {
      setAccount(window.sessionStorage.getItem("account"))
      setLoginStatus(window.sessionStorage.getItem("loginStatus") === "true")
    }, [])
  
    useEffect(() => {
      window.sessionStorage.setItem("account", account)
      window.sessionStorage.setItem("loginStatus", loginStatus)
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