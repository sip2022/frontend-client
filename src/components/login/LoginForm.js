import classes from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import CardForm from "../ui/CardForm";
import { getUser, login } from "../../utils/crud";
import { setearEstado } from "../../store/slices/userData/userDataSlice";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [disable, setDisable] = useState(true);

  function handleChange({ value, name }) {
    var error = validate(value, name);
    if (!error) {
      Object.values(input).filter((e) => e === "").length
        ? setDisable(true)
        : setDisable(false);
    } else {
      setDisable(true);
    }
  }

  function validate(value, name) {
    let ob = {};

    setInput((prev) => ({ ...prev, [name]: value }));
    switch (name) {
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

  async function loadLogin(params) {
    localStorage.setItem("accessToken", params.accessToken);
    const result = await getUser(input.email);
    if (!result.message) {
      alert("¡Logueo Exitoso!");
      // dispatch(setearEstado(result.user))
      // localStorage.setItem("logued_user", result.newUserData.id);
      navigate("/", {replace: true})
    } else {
      setErrors({
        globalError: result.message,
      });
    }
  }

  async function submitHandler(event) {
    event.preventDefault();
    const result = await login(input);
    !result.message
      ? loadLogin(result)
      : setErrors({
          globalError: result.message,
        });
  }

  function goNewUser(event) {
    event.preventDefault();
    navigate("/registro", { replace: true });
  }

  return (
    <section className={classes.sectionForm}>
      <CardForm>
        <form className={classes.form} onSubmit={submitHandler}>
          <img
            className={classes.iconoUser}
            src="/images/userIcono.png"
            alt="Login User Icon"
          />
          <h1>Bienvenido</h1>

          <Input
            name="email"
            key="email"
            type="email"
            placeholder="Ingrese E-mail"
            value={input.email}
            errors={errors}
            onChange={(e) => handleChange(e.target)}
          />

          <Input
            name="password"
            key="password"
            type="password"
            placeholder="Ingrese Contraseña"
            value={input.password}
            errors={errors}
            onChange={(e) => handleChange(e.target)}
          />

          <ErrorMessage errors={errors} name={"globalError"} />

          <a className={classes.link} id="olvContraLogin" href="/">
            ¿Olvidaste la contraseña?
          </a>
          <div className={classes.action}>
            <button id="ingresar-Usuario" disabled={disable}>
              Ingresar
            </button>
          </div>
          <div className={classes.action}>
            <a id="crear-Usuario" href="nuevoUsuario.html" onClick={goNewUser}>
              Crear nuevo usuario
            </a>
          </div>
        </form>
      </CardForm>
    </section>
  );
}

function Input(props) {
  const { errors, name } = props;
  return (
    <div className={classes.field}>
      <input {...props} autoComplete="none" />
      {errors[name] && <ErrorMessage errors={errors} name={name} />}
    </div>
  );
}

function ErrorMessage(props) {
  const { errors, name } = props;
  return (
    <div className={classes.failAlert}>
      <p>{errors[name]}</p>
    </div>
  );
}
