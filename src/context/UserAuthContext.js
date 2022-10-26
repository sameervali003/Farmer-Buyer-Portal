import { createContext, useContext} from "react";
import {RecaptchaVerifier,signInWithPhoneNumber,} from "firebase/auth";
import { auth } from "../firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {},auth);
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }
  return (<userAuthContext.Provider value={{setUpRecaptha}}>{children} </userAuthContext.Provider> );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}