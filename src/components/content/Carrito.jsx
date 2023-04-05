import axios from "axios";
import React, { useEffect, useState, Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../App";
import {
  deleteCart,
  getProduct,
  getUsuario,
} from "../../services/axios.service";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51MWLL2L4SPD0MxRcyV9eR8iQv4Jx3NqWCLIuWvPvL58Pjh4IVrP0DoYqjqmxXg69wqkDPhejIVB5iTSciJA7rt8k00jGCqBVto"
);

const Carrito = () => {
  const { id } = useParams();
  const [produc, setProduc] = useState([]);
  const [regions, setRegions] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  async function deleteCartObj(objid) {
    await deleteCart(id, objid)
      .then((response) => {
        getUser();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const notify = () => {
    toast.error("Error!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

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
        className="card cad-body h-10 "
      >
        <div className="form-group p-2 text-2xl h-10 ">
          <CardElement className="form-control border h-10   " />
        </div>

        <div
          style={{ padding: "5px", width: "150px" }}
          className="mt-2 my-auto"
        >
          <button
            className="btn btn-success bg-black text-white"
            disabled={!stripeus}
            style={{ width: "399px" }}
            onClick={() => {
              const ord =
                document.getElementById("regionId").options.selectedIndex;

              if (
                document.getElementById("regionId").options[ord].outerText ===
                "Cusco"
              ) {
                notify();
              } else {
                alert("Comprado exitosamente");
              }
            }}
          >
            Buy
          </button>
        </div>
      </form>
    );
  };

  async function getProvi(id) {
    const timestamp = Date.now();
    const proviResponse = await axios.get(
      `https://api.kaituperu.com/api/Provinces?filter={%22where%22:%20{%22regionId%22:%20%22${id}%22%20}}&_=${timestamp}`
    );
    setProvincias(proviResponse.data);
    setDistritos([]);
  }

  async function getDistric(id) {
    const timestamp = Date.now();
    const distritoResponse = await axios.get(
      `https://api.kaituperu.com/api/Districts?filter={%22where%22:%20{%22provinceId%22:%20%22${id}%22%20}}&_=${timestamp}`
    );
    setDistritos(distritoResponse.data);
  }

  async function getRegions() {
    try {
      const response = await fetch("https://api.kaituperu.com/api/Regions");
      const data = await response.json();
      setRegions(data);
    } catch (error) {
      console.error(error);
      setError("Hubo un problema al cargar las regiones.");
    }
  }

  async function getUser() {
    let i = [];
    const response = await getUsuario(id);
    let price = 0;

    await Promise.all(
      response.data.carrito.map(async (data) =>
        getProduct(data._id)
          .then((response) => {
            i.push({
              product: response.data,
              talla: data.talla,
              cantidad: data.cantidad,
            });
          })
          .catch((error) => {
            console.log(error);
          })
      )
    );
    setTotal(
      i.reduce(
        (accumulator, data) =>
          accumulator +
          data.product.modelMoneyValueId.costPrice * data.cantidad,
        0
      )
    );

    setProduc(i);
    setLoading(false);
  }

  useEffect(() => {
    /*  getProductsHd(); */
    getRegions();

    getUser();
  }, []);

  return (
    <div className="max-w-6xl w-auto m-auto flex lg:flex-row  flex-col">
      <div className="lg:w-1/2  w-full m-auto p-2">
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
                <option key={0} value={0} onClick={() => setProvincias([])}>
                  Selecciona la region
                </option>
                {regions.map((reg) => (
                  <option
                    key={reg.id}
                    onClick={() => getProvi(reg.id)}
                    value={reg.id}
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
                <option key={0} value={0} onClick={() => setDistritos([])}>
                  Selecciona la Provincia
                </option>
                {provincias.map((provi) => (
                  <option
                    key={provi.id}
                    onClick={() => getDistric(provi.id)}
                    value={provi.id}
                  >
                    {provi.name}
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
      <div className="lg:w-1/2 w-full mx-auto p-2">
        <div className="my-7 ">
          <hr className="w-11/12 my-5" />

          <div className="mb-5">
            <h2 className="uppercase font-mono text-xl">Informacion de pago</h2>
          </div>

          {loading ? (
            <div className="border  shadow rounded-md p-4 max-w-sm w-full ">
              <div className="animate-pulse flex space-x-4">
                <div className="flex flex-row w-full">
                  <div>
                    <img
                      src={
                        "https://api.kaituperu.com/imgs/1623801506383-SIN-CAP-STAY-POSITIVE.jpg"
                      }
                      alt="altura prod"
                      className="w-28"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>

                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : produc.length !== 0 ? (
            <div className="overflow-auto " style={{ maxHeight: "523px" }}>
              {produc.map((data, key) => {
                return (
                  <div key={key}>
                    <hr className="w-11/12 my-5" />
                    <div className="flex flex-row my-2 justify-between mx-2">
                      <div>
                        <img
                          src={data.product.modelPerColors[0].urlImage}
                          alt="altura prod"
                          className="w-28 p-2"
                          onClick={() => {
                            console.log("img");
                          }}
                        />
                      </div>
                      <div>
                        <h2 className="font-mono uppercase ">
                          {data.product.name}
                        </h2>
                        <p className="text-sm font-mono">Talla: {data.talla}</p>
                        <p className="text-sm font-mono">
                          Cantidad: {data.cantidad}
                        </p>
                        <p className="text-sm font-mono">
                          Color: {data.product.modelPerColors[0].color.tag}
                        </p>
                        <p className="text-sm font-mono">
                          Precio: S/.
                          {data.product.modelMoneyValueId.costPrice *
                            data.cantidad}
                        </p>
                      </div>

                      <div className="flex flex-row ">
                        <button
                          onClick={() => {
                            deleteCartObj(data.product._id);
                          }}
                          className="h-9 mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-black py-3 px-8 text-base font-medium text-white hover:bg-red-700 "
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
          <hr className="my-5" />
          <div className="flex flex-row justify-around mb-2">
            <h3 className="text-2xl">Total</h3>
            <h3 className="text-2xl">S/. {total}</h3>
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
