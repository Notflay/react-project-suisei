import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/Registrar.css";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/axios.service";

const Registrar = ({}) => {
  const navigate = useNavigate();

  async function formData(e) {
    e.preventDefault();

    console.log(e.target[1].value, e.target[2].value);

    createUser({
      email: e.target[1].value,
      password: e.target[2].value,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    navigate("/login");
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
                      Forma parte de Suisei Peru.<span>&#160;</span>
                    </h2>
                  </div>
                  <form className="formulario" onSubmit={formData}>
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

                    <input type="submit" value="REGISTRARME" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registrar;
