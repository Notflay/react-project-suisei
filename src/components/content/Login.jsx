import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/axios.service";

export default function Login() {
  const navigate = new useNavigate();

  async function loginIn(e) {
    e.preventDefault();
    console.log(e.target[1].value);
    console.log(e.target[2].value);
    await loginUser({
      email: e.target[1].value,
      password: e.target[2].value,
    })
      .then((response) => {
        if (response.status === 201) {
          navigate("/");
          localStorage.setItem("login", true);
        } else {
          alert("Usuario/Contraseña incorrecta");
        }
      })
      .catch((response) => {
        alert("Usuario/Contraseña incorrecta");
      });
  }

  return (
    <>
      <div className="flex-column bg-dark d-flex align-items-center justify-content-center vh-100">
        <div className="container-fluid col-lg-6 col-md-8 col-sm-10 mainbox">
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="/logo.png" alt="logo-img" />
                <p>Estilo es usar lo que te hace sentir bien</p>
              </div>
              <div className="flip-card-back">
                <div className="main">
                  <div className="titulo">
                    <h2 className="titulo-content">
                      Bienvenido a Suisei Peru.<span>&#160;</span>
                    </h2>
                  </div>
                  <form className="formulario" onSubmit={loginIn}>
                    <input type="hidden" name="remember" value="true" />

                    <p>Escribe tu correo:</p>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autocomplete="email"
                      required
                      placeholder="Email address"
                    />
                    <p>Escribe tu contraseña:</p>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="current-password"
                      required
                      placeholder="Password"
                    />

                    <input type="submit" value="INGRESAR" />

                    <div className="register">
                      <p>No tienes una cuenta, registrate!!!</p>
                    </div>

                    <a className="btn-register" href="/registro">REGISTRATE</a>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
