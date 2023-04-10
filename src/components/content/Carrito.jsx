import axios from "axios";
import React, {
  useEffect,
  useState,
  Fragment,
  useContext,
  useRef,
} from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../App";
import {
  createCom,
  deleteCart,
  getProduct,
  getUsuario,
  pageApi,
} from "../../services/axios.service";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import { jsPDF } from "jspdf";

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
  const form = useRef(null);
  const [clienteSecret, setClienteSecret] = useState("");

  async function deleteCartObj(objid) {
    await deleteCart(id, objid)
      .then((response) => {
        getUser();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const notify = (data) => {
    toast.error(data, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  async function handleSubmit(e, stripeus, elements) {
    try {
      e.preventDefault();

      const response = await getUsuario(id);
      const carrito = response.data.carrito;

      const selectCom = form.current[2];
      const comIndex = selectCom.selectedIndex;
      const tipoComprobante = selectCom[comIndex].value;

      const selectDoc = form.current[3];
      const comDoc = selectDoc.selectedIndex;
      const documentoIde = selectDoc[comDoc].value;

      const selectReg = form.current[5];
      const regIndex = selectReg.selectedIndex;
      const region = selectReg[regIndex].outerText;

      const selectProv = form.current[6];
      const provIndex = selectProv.selectedIndex;
      const provincia = selectProv[provIndex].outerText;

      const selectDist = form.current[7];
      const distIndex = selectDist.selectedIndex;
      const distrito = selectDist[distIndex].outerText;

      if (
        (form.current[0].value === "") |
        (form.current[1].value === "") |
        (form.current[4].length < 9) |
        (regIndex === 0) |
        (provIndex === 0) |
        (distIndex === 0) |
        (form.current[8].value === "") |
        (form.current[9].value === "") |
        (form.current[10].value === "")
      ) {
        notify("Te falta completar datos!");
      } else if (
        form.current[5][form.current[5].selectedIndex].outerText === "Ayacucho"
      ) {
        notify("No contamos con envio para esta zona :(");
      } else {
        const { error, paymentMethod } = await stripeus.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });

        if (!error) {
          const { id } = paymentMethod;

          const newComprobante = {
            clientId: response.data._id,
            nombre: form.current[0].value,
            apellido: form.current[1].value,
            tipoComprobante,
            documentoIde,
            numDocumento: form.current[4].value,
            region,
            provincia,
            distrito,
            direccion: form.current[8].value,
            referencia: form.current[9].value,
            telefono: form.current[10].value,
            total,
            tipoTarjeta: "Visa",
            productId: carrito,
          };

          /* pageApi({ id, amount: total, description: form.current[0].value })
            .then((response) => {})
            .catch((error) => {
              console.log(error);
            }); */

          await Promise.all([
            pageApi({
              id,
              amount: total,
              description: form.current[0].value,
            }),
            createCom(newComprobante),
          ]);
          alert(`Compra exitosa. Espera tu producto`);

          const doc = new jsPDF();

          // Título
          doc.setFontSize(14);
          doc.text("BOLETA DE VENTA", 20, 20);

          // Datos del cliente
          doc.setFontSize(12);
          doc.text("Cliente:", 20, 30);
          doc.text(
            `${newComprobante.nombre} ${newComprobante.apellido}`,
            45,
            30
          );

          doc.text("Dirección:", 20, 37);
          doc.text(`${newComprobante.direccion}`, 45, 37);

          doc.text("Distrito:", 20, 44);
          doc.text(`${newComprobante.distrito}`, 45, 44);

          // Línea horizontal
          doc.setLineWidth(0.1);
          doc.line(20, 50, 180, 50);

          // Detalles de la compra
          doc.setFontSize(12);
          doc.text("Descripción", 20, 60);
          doc.text("Cantidad", 100, 60);
          doc.text("Precio", 130, 60);

          let altura = 67;
          for (let i = 0; i < produc.length; i++) {
            altura = altura + 7;
            doc.text(`${produc[i].product.name}`, 20, altura);
            doc.text(`${produc[i].cantidad}`, 100, altura);
            doc.text(
              `S/ ${produc[i].product.modelMoneyValueId.costPrice.toFixed(2)}`,
              130,
              altura
            );
          }

          // Línea horizontal
          doc.setLineWidth(0.1);
          doc.line(20, altura + 7, 180, altura + 7);

          // Total
          doc.text("Total:", 100, altura + 14);
          doc.text(`S/ ${newComprobante.total.toFixed(2)}`, 130, altura + 14);

          doc.save("boleta.pdf");

          /*      return navigate("/"); */
        } else {
          alert(`${error.message}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const CheckOutForm = () => {
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
            type="submit"
            onClick={() => {}}
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

  async function changeSelectReg() {
    try {
      const regions = document.getElementById("regionId");
      const index = regions.selectedIndex;
      getProvi(regions[index].value);
    } catch (error) {
      res.status(501).send(error.message);
    }
  }

  async function changeSelectProv() {
    try {
      const provs = document.getElementById("provinciaId");
      const index = provs.selectedIndex;
      getDistric(provs[index].value);
    } catch (error) {
      res.status(501).send(error.message);
    }
  }

  useEffect(() => {
    getRegions();
    getUser();
  }, []);

  return (
    <div className="max-w-6xl w-auto m-auto flex lg:flex-row  flex-col">
      <ToastContainer />
      <div className="lg:w-1/2  w-full m-auto p-2">
        <div className="my-7">
          <hr className="w-11/12 my-5" />
          <form ref={form}>
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
              <select
                className="border rounded-sm w-11/12 h-9 outline-none bg-white px-2"
                id="comprobanteId"
              >
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
                onChange={changeSelectReg}
              >
                <option key={0} value={0} onClick={() => setProvincias([])}>
                  Selecciona la region
                </option>
                {regions.map((reg) => (
                  <option key={reg.id} value={reg.id}>
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
                id="provinciaId"
                name="provinciaId"
                className="border rounded-sm w-11/12 h-9 outline-none hover:outline-none bg-white px-2"
                onChange={changeSelectProv}
              >
                <option key={0} value={0} onClick={() => setDistritos([])}>
                  Selecciona la Provincia
                </option>
                {provincias.map((provi) => (
                  <option key={provi.id} value={provi.id}>
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
                id="distritoId"
                name="distritoId"
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
                id="direccionId"
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
                id="telefoID"
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
                          Precio: S/
                          {(
                            data.product.modelMoneyValueId.costPrice *
                            data.cantidad
                          ).toFixed(2)}
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
            <h3 className="text-2xl">S/ {total.toFixed(2)}</h3>
          </div>

          <div>
            <Elements stripe={stripePromise}>
              <div>
                <div className="row">
                  <div className="col-md-4 offset-md-4">
                    {" "}
                    <CheckOutForm />
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
