import classes from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';

import Card from '../ui/Card';

function LoginForm(props) {

    const navigate = useNavigate();
    
    function submitHandler(event) {
        event.preventDefault();
        // TODO fetch
    }

    function goNewUser(event) {
        event.preventDefault();
        navigate('/newUser', {replace: true});
    }
    
    return(
        <Card >
            <form className={classes.form} onSubmit={submitHandler}>
                <img className={classes.iconoUser} src=".../images/userIcono.png" alt="" />
                <h1>Bienvenido</h1>
                <div className={classes.field}>
                    <input id="nombreUsuario" type="text" placeholder="Ingrese Usuario" required />
                </div>
                <div className={classes.field}>
                    <input id="contraUsuario" type="password" placeholder="Ingrese Contraseña" required />
                </div>
                    <a className={classes.link} id="olvContraLogin" href="/">¿Olvidaste la contraseña?</a>
                <div className={classes.action}>
                    <button  id="ingresarUsuario">Ingresar</button>
                </div>
                <div className={classes.action}>
                    <a id="crearUsuario" href="nuevoUsuario.html" onClick={goNewUser}>Crear nuevo usuario</a>
                </div>
            </form>
        </Card>
    );
}

export default LoginForm;