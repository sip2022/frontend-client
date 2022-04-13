import classes from './NewUserForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import CardForm from '../ui/CardForm';


import { register } from "../../actions/auth";
import { useDispatch } from 'react-redux';


function NewUserForm() {

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dni: '',
        phone: '',
        age: '',
        errors: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            dni: '',
            phone: '',
            age: ''
        },
        disabled: true,
        loading: false
    });

    function handleChange(e) {
        const { value, name } = e.target;
    
        let errors = input.errors

        switch(name){
            case 'firstName':
                errors.firstName = value.length < 3 ? 'El Nombre debe tener minimo 3 caracteres.' : '' ;
                break;
            case 'lastName':
                errors.lastName = value.length < 3 ? 'El Apellido debe tener minimo 3 caracteres.' : '' ;
                break;
            // case 'age':
            //     errors.age = value.length < 3 ? ' - ' : '' ;
            //     break;
            // case 'phone':
            //     errors.lastName = value.length < 3 ? ' - ' : '' ;
            //     break;
            case 'dni':
                errors.dni = value.length != 8 ? 'El DNI debe ser de 8 numero exactos.' : '' ;
                break;
            case 'email':
                var emailPattern = /\S+@\S+\.\S+/;
                errors.email = emailPattern.test(value) ? '' : 'El mail introducido no es valido.' ;
                break;
            case 'password':
                errors.password = value.length < 8 ? 'La contraseña debe tener minimo 8 caracteres.' : '' ;
                break;
            default: break;
        }
        setInput({
            [name]: value, // Sintaxis ES6 para actualizar la key correspondiente
            errors
        });

        validarFormulario(input.errors)
    }

    function validarFormulario (errors){
        let valid = true;
        Object.values(errors).forEach( (val) => val.length > 0 && (valid = false));
        if(valid){
            setInput({
                disabled: false
            })
        }else{
            setInput({
                disabled: true
            })
        }
        return valid;
    }

    
    function submitHandler(event) {
        event.preventDefault();

        // firstName, lastName, dni, email, age, phone, password
        dispatch(register(
            input.firstName,
            input.lastName,
            input.dni,
            input.email,
            input.age,
            input.phone,
            input.password
        ))
            .then(()=>{
                navigate('/activacion', {replace: true})
            })
            .catch(function(error){
                console.log(error)
                // TODO mostrar mensaje de error
            })

        console.log('no validado')
    
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
                    <input 
                        name="firstName" 
                        id="campoNombre" 
                        type="text" 
                        placeholder="Nombre de Usuario" 
                        required
                        value={input.firstName}
                        onChange={handleChange}
                    />
                    {!input.errors.firstName ? null : 
                        <div className={classes.failAlert}>
                            {input.errors.firstName}
                        </div>
                    }
                </div>

                <div className={classes.field}>
                    <input 
                        name="lastName" 
                        id="campoApellido" 
                        type="text" 
                        placeholder="Apellido de usuario" 
                        required
                        value={input.lastName}
                        onChange={handleChange}
                    />
                    {!input.errors.lastName ? null : 
                        <div className={classes.failAlert}>
                            {input.errors.lastName}
                        </div>
                    }
                </div>

                <div className={classes.field}>
                    <input 
                        name="dni" 
                        id="campoDNI" 
                        type="number" 
                        placeholder="DNI"
                        required
                        value={input.dni}
                        onChange={handleChange}
                    />
                    {!input.errors.dni ? null : 
                        <div className={classes.failAlert}>
                            {input.errors.dni}
                        </div>
                    }
                </div>

                <div className={classes.field}>
                    <input 
                        name="age" 
                        id="campoEdad" 
                        type="number" 
                        placeholder="Edad" 
                        min='-1'
                        required
                        value={input.age}
                        onChange={handleChange}
                    />
                    {!input.errors.age ? null : 
                        <div className={classes.failAlert}>
                            {input.errors.age}
                        </div>
                    }
                </div>

                <div className={classes.field}>
                    <input 
                        name="phone" 
                        id="campoTel" 
                        type="tel" 
                        placeholder="Telefono" 
                        // required
                        value={input.phone}
                        onChange={handleChange}
                    />
                    {!input.errors.phone ? null : 
                        <div className={classes.failAlert}>
                            {input.errors.phone}
                        </div>
                    }
                </div>

                <div className={classes.field}>
                    <input 
                        name="email" 
                        id="campoMail" 
                        type="email" 
                        placeholder="E-mail"   
                        required  
                        value={input.email}
                        onChange={handleChange}
                    />
                    {!input.errors.email ? null : 
                        <div className={classes.failAlert}>
                            {input.errors.email}
                        </div>
                    }
                </div>

                <div className={classes.field}>
                    <input 
                        name="password" 
                        id="campoPass" 
                        type="password" 
                        placeholder="Contraseña" 
                        required
                        value={input.password}
                        onChange={handleChange}
                    />
                    {!input.errors.password ? null : 
                        <div className={classes.failAlert}>
                            {input.errors.password}
                        </div>
                    }
                </div>

                <div className={classes.action}>
                    <button disabled={input.disabled} id="crear-Usuario">¡Registrate!</button>
                </div>

                <div className={classes.action}>
                    <a id="login-Usuario" href="login.html" onClick={goLoginUser}>¿Ya tienes una cuenta?</a>
                </div>
            </form>
        </CardForm>
    );
}

export default NewUserForm;