import classes from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';

import CardForm from '../ui/CardForm';
import { useContext, useRef } from 'react';
import AuthContext from '../../store/authContext';

function LoginForm(props) {

    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);

    const nameInputRef = useRef();
    
    function submitHandler(event) {
        event.preventDefault();
        // TODO fetch
        authCtx.loginUser(nameInputRef.current.value);
        
        navigate('/', {replace: true});
    }

    function goNewUser(event) {
        event.preventDefault();
        navigate('/newUser', {replace: true});
    }

    return(
        <CardForm >
            <form className={classes.form} onSubmit={submitHandler}>
                <img className={classes.iconoUser} src="../../images/userIcono.png" alt="" />
                <h1>Bienvenido</h1>
                <div className={classes.field}>
                    <input id="nombre-Usuario" type="text" placeholder="Ingrese Usuario" ref={nameInputRef} required />
                </div>
                <div className={classes.field}>
                    <input id="contra-Usuario" type="password" placeholder="Ingrese Contraseña" required />
                </div>
                <a className={classes.link} id="olvContraLogin" href="/">¿Olvidaste la contraseña?</a>
                <div className={classes.action}>
                    <button  id="ingresar-Usuario">Ingresar</button>
                </div>
                <div className={classes.action}>
                    <a id="crear-Usuario" href="nuevoUsuario.html" onClick={goNewUser}>Crear nuevo usuario</a>
                </div>
            </form>
        </CardForm>
    );
}

export default LoginForm;