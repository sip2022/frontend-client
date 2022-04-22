import { Link } from 'react-router-dom';

import classes from './mainNavigation.module.css';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

function MainNavigation() {
    const username = useSelector((state) => state.user.username)

    useEffect(() => {
        // TODO
        // Ver si el user está seteado. Esto setea automaticamente "usernae" en store
        // Recuperar store
    },[])

    return(
        <header className={classes.header}>
            <div className={classes.logo}>Club Geminis</div>
            <nav>
                <ul>
                    <li>
                        <Link to='/actividades'>Actividades</Link>
                    </li>
                    <li>
                        <Link to='/planes'>Planes</Link>
                    </li>
                    <li>
                        <Link to='/contactos'>Contactos</Link>
                    </li>

                    {username ? <LoggedSection userName={username} /> : <NotLoggedSection />}                
                    {/* <NotLoggedSection /> */}
                </ul>
            </nav>
        </header>
    );
}

function LoggedSection(props) {
    // TODO cmopletar para que muestre el nombre y la imagen del usuario
    return (
        <li>
            <Link to='/login'>{props.userName}</Link>
        </li> 
    );
}

function NotLoggedSection() {
    
    return (
        <li>
            <Link to='/login'>Iniciar sesion/Registrarse</Link>
        </li> 
    );
}

export default MainNavigation;