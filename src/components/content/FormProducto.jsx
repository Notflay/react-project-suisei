import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  getColors,
  getModel,
  getMoney,
  getTypeProd,
  newProduct,
} from "../../services/axios.service";
import { uploadFile } from "../../firebase/config";

const FormProducto = () => {
  const [colores, setColores] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [tipo, setTipo] = useState([]);
  const [money, setMoney] = useState([]);

  async function getDatos() {
    await Promise.all(
      setColores((await getColors()).data),
      setModelos((await getModel()).data),
      setMoney((await getMoney()).data),
      setTipo((await getTypeProd()).data)
    );
  }

  async function HandleImage(e) {
    const result = await uploadFile(e);
    return result;
  }

  async function submitProduct(e) {
    e.preventDefault();

    const producto = {
      name: e.target[0].value,
      description: e.target[1].value,
      isObservationVisible: true,
      titleObservation: "",
      isPack: false,
      productId: e.target[2].value,
      modelStatId: e.target[3].value,
      modelMoneyValueId: e.target[4].value,
      modelPerColors: [
        {
          urlImage: await HandleImage(e.target[5].files[0]),
          name: e.target[0].value,
          gallery: [await HandleImage(e.target[5].files[0])],
          modelProductId: e.target[2].value,
          color: e.target[6].value,
          clothingSize: {
            s: e.target[7].value,
            m: e.target[8].value,
            l: e.target[9].value,
          },
        },
      ],
    };

    console.log(producto);
    newProduct(producto);
  }

  useEffect(() => {
    getDatos();
  }, []);

  return (
    <div className="w-auto max-w-5xl mx-auto my-7">
      <h1>Creacion de producto</h1>
      <form className="" onSubmit={submitProduct}>
        <div className="my-2">
          <label>Nombre</label>
        </div>
        <div>
          <input
            type={"text"}
            name="name"
            className="border rounded-sm w-3/5 h-9 outline-none hover:border-blue-400 px-2"
          />
        </div>
        <div className="my-2">
          <label>Descripcion</label>
        </div>
        <div>
          <input
            type={"text"}
            name="description"
            className="border rounded-sm w-3/5 h-9 outline-none hover:border-blue-400 px-2"
          />
        </div>
        <div className="my-2">
          <label>Tipo del producto</label>
        </div>
        <select className="border rounded-sm w-3/5 h-9 outline-none hover:border-blue-400 px-2">
          {tipo.map((tip, key) => (
            <option key={key} value={tip._id}>
              {tip.name} {tip.nameGender}
            </option>
          ))}
        </select>
        <div className="my-2">
          <label>Estado</label>
        </div>
        <select className="border rounded-sm w-3/5 h-9 outline-none hover:border-blue-400 px-2">
          {modelos.map((mod, key) => (
            <option key={key} value={mod._id}>
              {mod.name}
            </option>
          ))}
        </select>
        <div className="my-2">
          <label>Costo</label>
        </div>
        <select className="border rounded-sm w-3/5 h-9 outline-none hover:border-blue-400 px-2">
          {money.map((mon, key) => (
            <option key={key} value={mon._id}>
              {mon.costPrice}
            </option>
          ))}
        </select>
        <div className="my-2">
          <label>Imagen</label>
        </div>
        <div>
          <input
            type={"file"}
            name="urlImage"
            className="border rounded-sm w-3/5 h-9 outline-none hover:border-blue-400 px-2"
          />
        </div>
        <div className="my-2">
          <label>Colores</label>
        </div>
        <select className="border rounded-sm w-3/5 h-9 outline-none hover:border-blue-400 px-2">
          {colores.map((col, key) => (
            <option key={key} value={col._id}>
              {col.tag}
            </option>
          ))}
        </select>
        <div className="my-2">
          <label>Stock - S</label>
        </div>
        <input
          type={"number"}
          name="stock-S"
          className="border rounded-sm w-3/5 h-9 outline-none hover:border-blue-400 px-2"
        />
        <div className="my-2">
          <label>Stock - M</label>
        </div>
        <input
          type={"number"}
          name="stock-S"
          className="border rounded-sm w-3/5 h-9 outline-none hover:border-blue-400 px-2"
        />
        <div className="my-2">
          <label>Stock - L</label>
        </div>
        <input
          type={"number"}
          name="stock-S"
          className="border rounded-sm w-3/5 h-9 outline-none hover:border-blue-400 px-2"
        />
        <button className="border bg-slate-300 rounded-sm w-3/5 h-9 outline-none hover:border-blue-400 px-2 my-2">
          Crear
        </button>
      </form>
    </div>
  );
};

export default FormProducto;
