import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  getColors,
  getModel,
  getMoney,
  getTypeProd,
} from "../../services/axios.service";

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

  useEffect(() => {
    getDatos();
  }, []);

  return (
    <div className="w-auto max-w-5xl mx-auto my-7">
      <h1>Creacion de producto</h1>
      <form className="">
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
            accept="image/png,image/jpeg"
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
      </form>
    </div>
  );
};

export default FormProducto;
