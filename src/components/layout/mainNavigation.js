import { Link } from 'react-router-dom';

import classes from './mainNavigation.module.css';

function MainNavigation() {

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
                    <li>
                        <Link to='/login'>Iniciar sesion/Registrarse</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;