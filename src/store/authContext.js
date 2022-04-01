import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'

const AuthContext = createContext({
    isLogged: false,
    logguedName: null,
    loginUser: (userName) => {},
    logoutUser:  () => {},
});

export function AuthContextProvider(props) {
    
    const [isLogged, setIsLogged] = useState(false);
    const [loggedName, setLoggedName] = useState();

    useEffect( () => {
        // TODO get cookies
        const username = Cookies.get('username');
        if(username){
            setIsLogged(true);
            setLoggedName(username);
        }
        console.log('Se verificaron las cookies. Esto deberia pasar una vez solamente')
    }, []);

    function loginUserHandler(userName) {
        // TODO set cookies
        Cookies.set('username', userName, {expires: 1});
        setLoggedName(userName);
        setIsLogged(true);
    }

    function logoutUserHandler(){
        // TODO set cookies
        Cookies.remove('username');
        setLoggedName(null);
        setIsLogged(false);
    }

    const context={
        isLogged: isLogged,
        logguedName: loggedName,
        loginUser: loginUserHandler,
        logoutUser: logoutUserHandler,
    };

    return(
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

