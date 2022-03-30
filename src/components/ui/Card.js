import classes from './Card.module.css'

// WRAP component
function Card(props) {
    return(
        <div className={classes.card}>
            {props.children}
        </div>
    );
}

export default Card;