import axios from "axios";
import React, { useEffect, useState, Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../App";
import { getProduct } from "../../services/axios.service";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51MWLL2L4SPD0MxRcyV9eR8iQv4Jx3NqWCLIuWvPvL58Pjh4IVrP0DoYqjqmxXg69wqkDPhejIVB5iTSciJA7rt8k00jGCqBVto"
);

const Carrito = () => {
  const { id } = useParams();
  const [produc, setProduc] = useState(null);
  const [regions, setRegions] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);

  const { preCompra } = useContext(AppContext);

  const [open, setOpen] = useState(true);

  async function handleSubmit(e, stripeus, elements) {
    try {
      e.preventDefault();
      const vaOne = parseInt(document.getElementById("regionId").value);
      const vaTwo = parseInt(document.getElementById("provinciaid").value);
      const vaThre = parseInt(document.getElementById("distritoId").value);
      const direc = document.getElementById("direccionId").value;
      const telef = document.getElementById("telefoID").value;
      const compId = parseInt(document.getElementById("comprobanteId").value);
      if (
        (vaOne === 0) |
        (vaTwo === 0) |
        (vaThre === 0) |
        (direc.trim() === "") |
        (telef.length < 9) |
        (compId === 0)
      ) {
        alert("No has terminado de llenar los datos");
      } else {
        const { error, paymentMethod } = await stripeus.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });
        const cookies = new Cookies();
        const idUser = cookies.get("id");

        if (!error) {
          const { id } = paymentMethod;
          pageApi({ id, amount: subTotal })
            .then(async (response) => {})
            .catch((error) => {
              console.log(error);
            })
            .finally(async () => {
              if (idUser !== undefined) {
                console.log("diferente");
                await deleteAllCt(idUser).then(() => getVentasBooks());
              }
            });
          alert(`Compra exitosa. Espera tu producto`);
          return navigate("/");
        } else {
          alert(`${error.message}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const CheckForm = () => {
    const stripeus = useStripe();
    const elements = useElements();

    return (
      <form
        onSubmit={(e) => handleSubmit(e, stripeus, elements)}
        className="card cad-body"
      >
        <div className="form-group">
          <CardElement className="form-control border h-5" />
        </div>

        <div style={{ padding: "5px", width: "150px" }}>
          <button
            className="btn btn-success bg-black text-white"
            disabled={!stripeus}
            style={{ width: "399px" }}
            onClick={() => {
              alert("Comprado exitosamente");
            }}
          >
            Buy
          </button>
        </div>
      </form>
    );
  };

  async function getProvi(id) {
    const proviResponse = await axios.get(
      `https://api.kaituperu.com/api/Provinces?filter={%22where%22:%20{%22regionId%22:%20%22${id}%22%20}}`
    );
    setProvincias(proviResponse.data);
    setDistritos([]);
  }

  async function getDistric(id) {
    const distritoResponse = await axios.get(
      `https://api.kaituperu.com/api/Districts?filter={%22where%22:%20{%22provinceId%22:%20%22${id}%22%20}}`
    );
    setDistritos(distritoResponse.data);
  }

  async function getRegions() {
    const regionsResponse = await axios.get(
      "https://api.kaituperu.com/api/Regions"
    );
    setRegions(regionsResponse.data);
  }

  async function getProductsHd() {
    const response = await getProduct(id);
    setProduc(response.data);
    console.log(response.data.modelPerColors[0]);
  }

  useEffect(() => {
    getProductsHd();
    getRegions();
    console.log(preCompra);
  }, []);

  return (
    <div className="w-7/12 m-auto flex flex-row">
      <div className="w-1/2 ">
        <div className="my-7">
          <hr className="w-11/12 my-5" />
          <form>
            <div className="my-2">
              <label>Nombres</label>
            </div>
            <div>
              <input
                type={"text"}
                className="border rounded-sm w-11/12 h-9 outline-none hover:border-blue-400 px-2"
              />
            </div>
            <div className="my-2">
              <label>Apellidos</label>
            </div>
            <div>
              <input
                type={"text"}
                className="border rounded-sm w-11/12 h-9 outline-none hover:border-blue-400 px-2"
              />
            </div>
            <div className="my-2">
              <label>Comprobante de Pago</label>
            </div>
            <div>
              <select className="border rounded-sm w-11/12 h-9 outline-none bg-white px-2">
                <option>Boleta</option>
                <option>Factura</option>
              </select>
            </div>
            <div className="my-2">
              <label>Documento de identificación</label>
            </div>
            <div className="flex flex-row w-11/12 justify-between">
              <select className="border rounded-sm  h-9 outline-none bg-white px-2">
                <option>DNI</option>
                <option>CARNET DE EXTRANJERIA</option>
              </select>
              <input
                type={"number"}
                className="border rounded-sm  h-9 outline-none bg-white px-2"
              ></input>
            </div>
            <div className="my-2">
              <label>Region</label>
            </div>
            <div className="my-2">
              <select
                id="regionId"
                name="regionId"
                className="border rounded-sm w-11/12 h-9 outline-none hover:outline-none bg-white px-2"
                style={{}}
              >
                <option value={0} onClick={() => setProvincias([])}>
                  Selecciona la region
                </option>
                {regions.map((reg, key) => (
                  <option
                    onClick={() => getProvi(reg.id)}
                    key={key}
                    value={key + 1}
                  >
                    {reg.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="my-2">
              <label>Provincia</label>
            </div>
            <div className="my-2">
              <select
                id="regionId"
                name="regionId"
                className="border rounded-sm w-11/12 h-9 outline-none hover:outline-none bg-white px-2"
                style={{}}
              >
                <option value={0} onClick={() => setProvincias([])}>
                  Selecciona la Provincia
                </option>
                {provincias.map((provi, key) => (
                  <option
                    key={key}
                    onClick={() => getDistric(provi.id)}
                    value={key + 1}
                  >
                    {" "}
                    {provi.name}{" "}
                  </option>
                ))}
              </select>
            </div>

            <div className="my-2">
              <label>Distritos</label>
            </div>
            <div className="my-2">
              <select
                id="regionId"
                name="regionId"
                className="border rounded-sm w-11/12 h-9 outline-none hover:outline-none bg-white px-2"
                style={{}}
              >
                <option value={0} onClick={() => setProvincias([])}>
                  Seleccion el distrito
                </option>
                {distritos.map((dist, key) => (
                  <option key={key} value={key + 1}>
                    {" "}
                    {dist.name}{" "}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-2">
              <label>Dirección</label>
            </div>
            <div>
              <input
                type={"text"}
                className="border rounded-sm w-11/12 h-9 outline-none hover:border-blue-400 px-2"
              />
            </div>
            <div className="my-2">
              <label>Referencia</label>
            </div>
            <div>
              <input
                type={"text"}
                className="border rounded-sm w-11/12 h-9 outline-none hover:border-blue-400 px-2"
              />
            </div>
            <div className="my-2">
              <label>Teléfono de referencia</label>
            </div>
            <div>
              <input
                type={"number"}
                className="border rounded-sm w-11/12 h-9 outline-none hover:border-blue-400 px-2"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="w-1/2 ">
        <div className="my-7">
          <hr className="my-5" />
          <div>
            <h2>Informacion de pago</h2>
          </div>
          <div className="flex flex-row">
            <div>
              {produc ? (
                <img
                  src={produc.modelPerColors[0].urlImage}
                  alt="altura prod"
                  className="w-28"
                />
              ) : null}
              {/*  <img src={produc} alt="altura prod" className="w-28" /> */}
            </div>
            <div>
              {produc ? <h2>{produc.name}</h2> : null}
              {/* <h2>{produc.name}</h2> */}
              <p>Talla: M</p>
              <p>Cantidad: 1 </p>
              <p>Color: </p>
            </div>
          </div>
          <div>
            <Elements stripe={stripePromise}>
              <div>
                <div className="row">
                  <div className="col-md-4 offset-md-4">
                    {" "}
                    <CheckForm />
                  </div>
                </div>
              </div>
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
