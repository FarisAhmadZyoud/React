import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext=createContext();

const UserContextProvider= ({children})=>{
     const [userName,setUserName] = useState();
      const [userToken,setUserToken] = useState(localStorage.getItem('userToken'));
      const [Auth,setAuth]= useState(null);
      const getUserData= ()=>{
          if(userToken!=null){

            console.log(userToken);
            const token = userToken
            const decoded = jwtDecode(token);
             setAuth(decoded);
             setUserName(decoded.userName);
             
          }

      }
       useEffect( () =>{
         
        getUserData();


       },[userToken]); 

       return <UserContext.Provider value={{userName,setUserToken,setUserName}}>
        {children}
        </UserContext.Provider>
        
        


}
export default UserContextProvider;
