import classes from './NewUserForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

import CardForm from '../ui/CardForm';

function NewUserForm(props) {

    const navigate = useNavigate();

    const dniInputRef = useRef();
    const passInputRef = useRef();
    const emailInputRef = useRef();
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const ageInputRef = useRef();
    const phoneInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredDni = dniInputRef.current.value;
        const enteredPass = passInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredFirstName = firstNameInputRef.current.value;
        const enteredLastName = lastNameInputRef.current.value;
        const enteredAge = ageInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;

        fetch("https://sip-api-dev.herokuapp.com/user", {
                method: 'POST', 
                mode: 'cors', 
                cache: 'no-cache', 
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
                body: JSON.stringify(
                    {
                        "dni": enteredDni,
                        "password": enteredPass,
                        "email": enteredEmail,
                        "firstName": enteredFirstName,
                        "lastName": enteredLastName,
                        "age": enteredAge,
                        "phone": enteredPhone
                    }
                )})
            .then(data => {
                console.log('Success:', data);
                })
            .catch((error) => {
                console.error('Error:', error);
                });
        
    }
    
    function goLoginUser(event) {
        event.preventDefault();
        navigate('/login', {replace: true})
    }

    return(
        <CardForm >
            <form className={classes.form} onSubmit={submitHandler}>
                <h1>¡Crea un nuevo usuario!</h1>
                
                <div className={classes.field}>
                    <input id="campoNombre" type="text" placeholder="Nombre de Usuario" ref={firstNameInputRef} required />
                </div>

                <div className={classes.field}>
                    <input id="campoApellido" type="text" placeholder="Apellido de usuario" ref={lastNameInputRef} required />
                </div>

                <div className={classes.field}>
                    <input id="campoDNI" type="number" placeholder="DNI" ref={dniInputRef} required />
                </div>

                <div className={classes.field}>
                    <input id="campoEdad" type="number" placeholder="Edad" ref={ageInputRef} required min='-1'/>
                </div>

                <div className={classes.field}>
                    <input id="campoTel" type="tel" placeholder="Telefono" ref={phoneInputRef} required />
                </div>

                <div className={classes.field}>
                    <input id="campoMail" type="email" placeholder="E-mail" ref={emailInputRef} required />
                </div>

                <div className={classes.field}>
                    <input id="campoPass" type="password" placeholder="Contraseña" ref={passInputRef} required />
                </div>

                <div className={classes.action}>
                    <button  id="crear-Usuario">¡Registrate!</button>
                </div>

                <div className={classes.action}>
                    <a id="login-Usuario" href="login.html" onClick={goLoginUser}>Iniciar Sesion</a>
                </div>
            </form>
        </CardForm>
    );
}

export default NewUserForm;