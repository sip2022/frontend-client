import classes from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';

import CardForm from '../ui/CardForm';
import { useRef } from 'react';


// import { login } from "../../actions/auth";
// import { useDispatch } from 'react-redux';


function LoginForm(props) {

    // const dispatch = useDispatch()

    const navigate = useNavigate();

    const nameInputRef = useRef();

    const state = {
        email: "",
        password: "",
    }

    function onChangeEmail(e) {
        state.email = e
    }
    function onChangePassword(e) {
        state.password = e
    }
    
    function submitHandler(event) {
        event.preventDefault();
        state.loading = true;

        // validates data
        // if(validado){}

        // dispatch(login(state.email, state.password))
        //     .then( () => {
        //         navigate('/', {replace: true});
        //     })
        //     .catch( (error) => {
        //         console.log("Error al loguearse")
        //         console.log(error)
        //         // TODO mostrar mensaje de error
        //     })
    }

    function goNewUser(event) {
        event.preventDefault();
        navigate('/newUser', {replace: true});
    }

    return(
        <CardForm >
            <form className={classes.form} onSubmit={submitHandler}>
                <img className={classes.iconoUser} src="../../../images/userIcono.png" alt="" />
                <h1>Bienvenido</h1>
                <div className={classes.field}>
                    <input id="email-Usuario" type="email" placeholder="Ingrese E-mail" ref={nameInputRef} onChange={onChangeEmail} required />
                </div>
                <div className={classes.field}>
                    <input id="contra-Usuario" type="password" placeholder="Ingrese Contraseña" onChange={onChangePassword} required />
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