import { Link } from 'react-router-dom';

import classes from './mainNavigation.module.css';

function MainNavigation() {

    return(
        <header >
            <div >Club Geminis</div>
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
                        <Link to='/planes'>Planes</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;