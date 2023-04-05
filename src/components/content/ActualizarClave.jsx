import React from "react";

import "../css/ActualizarClave.css";
import { useNavigate } from "react-router-dom";
import { udpatePassword } from "../../services/axios.service";

const ActualizarClave = ({}) => {
  const navigate = useNavigate();

  async function formData(e) {
    e.preventDefault();

    udpatePassword({
      email: e.target[1].value,
      password: e.target[2].value,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    navigate("/updatePass");
  }

  return (
    <>
      <div className="flex-column bg-light d-flex align-items-center justify-content-center vh-100">
        <div className="container-fluid col-lg-6 col-md-8 col-sm-10 mainbox bg-secondary">

                <div className="main">
                  <div className="titulo">
                    <h2 className="titulo-content">
                      Restablecer Contraseña
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
                    <p>Escribe tu nueva contraseña:</p>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="current-password"
                      required
                      placeholder="Password"
                    />

                    <input type="submit" value="RESTABLECER" />
                  </form>
                </div>
              </div>
            </div>

    </>
  );
};

export default ActualizarClave;