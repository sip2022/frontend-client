import classes from "./NewUserForm.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CardForm from "../ui/CardForm";
import { useDispatch, useSelector } from "react-redux";
import { registrarUsuario } from "../../store/slices/userData";

// import { register } from "../../actions/auth";

export default function NewUserForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dni: "",
    phone: "",
    age: "",
  });
  const [errors, setErrors] = useState({});
  const [{ disable }, setFlag] = useState({
    disable: true,
  });

  function handleChange({ value, name }) {
    var error = validate(value, name);
    if (!error) {
      Object.values(input).filter((e) => e === "").length
        ? setFlag((prev) => ({ ...prev, disable: true }))
        : setFlag((prev) => ({ ...prev, disable: false }));
    } else {
      setFlag((prev) => ({ ...prev, disable: true }));
    }
  }

  function validate(value, name) {
    let ob = {};

    setInput((prev) => ({ ...prev, [name]: value }));
    switch (name) {
      case "firstName":
        if (value.length < 3)
          ob[name] = "El Nombre debe tener minimo 3 caracteres.";
        break;
      case "lastName":
        if (value.length < 3)
          ob[name] = "El Apellido debe tener minimo 3 caracteres.";
        break;
      case "age":
        if (value > 100) ob[name] = " - ";
        break;
      case "phone":
        if (value.length < 3 || value.length > 10) ob[name] = " - ";
        break;
      case "dni":
        if (value.length !== 8)
          ob[name] = "El DNI debe ser de 8 numero exactos.";
        break;
      case "email":
        var emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(value))
          ob[name] = "El mail introducido no es valido.";
        break;
      case "password":
        if (value.length < 8)
          ob[name] = "La contraseña debe tener minimo 8 caracteres.";
        break;
      default:
        break;
    }

    setErrors(ob);
    if (Object.keys(ob).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  function submitHandler(event) {
    event.preventDefault();

    // (firstName, lastName, dni, email, age, phone, password)
    dispatch(
      registrarUsuario(
        input.firstName,
        input.lastName,
        input.dni,
        input.email,
        input.age,
        input.phone,
        input.password
      )
    )
      .then(() => {
        console.log("Registro exitoso");
        navigate("/activacion", { replace: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function goLoginUser(event) {
    event.preventDefault();
    navigate("/login", { replace: true });
  }

  return (
    <CardForm>
      <form className={classes.form} onSubmit={submitHandler}>
        <h1>BIENVENIDO</h1>
        <Input
          name="firstName"
          key="campoNombre"
          type="text"
          placeholder="Nombre"
          value={input.firstName}
          errors={errors}
          onChange={(e) => handleChange(e.target)}
        />
        <Input
          name="lastName"
          key="campoApellido"
          type="text"
          placeholder="Apellido"
          value={input.lastName}
          errors={errors}
          onChange={(e) => handleChange(e.target)}
        />
        <Input
          type="text"
          name="dni"
          key="campoDNI"
          placeholder="DNI"
          value={input.dni}
          errors={errors}
          onChange={(e) => handleChange(e.target)}
        />
        <Input
          name="age"
          key="campoEdad"
          type="number"
          placeholder="Edad"
          value={input.age}
          min={15}
          errors={errors}
          onChange={(e) => handleChange(e.target)}
        />
        <Input
          name="phone"
          key="campoTel"
          type="text"
          placeholder="Telefono"
          value={input.phone}
          errors={errors}
          onChange={(e) => handleChange(e.target)}
        />
        <Input
          name="email"
          key="campoMail"
          type="text"
          placeholder="E-mail"
          value={input.email}
          errors={errors}
          onChange={(e) => handleChange(e.target)}
        />
        <Input
          name="password"
          key="campoPass"
          type="password"
          placeholder="Contraseña"
          errors={errors}
          value={input.password}
          onChange={(e) => handleChange(e.target)}
        />

        <div className={classes.action}>
          <button disabled={disable} id="crear-Usuario">
            ¡Registrate!
          </button>
        </div>

        <div className={classes.action}>
          <a id="login-Usuario" href="login.html" onClick={goLoginUser}>
            ¿Ya tienes una cuenta?
          </a>
        </div>
      </form>
    </CardForm>
  );
}

function Input(props) {
  const { errors, name } = props;
  return (
    <div className={classes.field}>
      <input {...props} autoComplete="none" />
      {errors[name] && (
        <div className={classes.failAlert}>
          <p>{errors[name]}</p>
        </div>
      )}
    </div>
  );
}
