import classes from './activationSucces.module.css';

function ActivationSucces(props) {
    

    return(
        <section className={classes.activationMessage}>
            <img src='' />
            <p>¡Su cuenta ha sido registrada con éxito, pero no está activada!</p>
            <p>Para activar su cuenta, use el link que le llegó a su correo.</p>
            <p>Si el mail de activacion no llego, haz click aqui!</p>
        </section>
    );
}

export default ActivationSucces;