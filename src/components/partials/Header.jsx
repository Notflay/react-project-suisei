import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineDropbox } from "react-icons/ai";

import { AppContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reporteMensual, searchForTitle } from "../../services/axios.service";
import { useRef } from "react";
import { jsPDF } from "jspdf";

import "jspdf-autotable";
import Buscador from "../content/Buscador";

const Header = ({ changeItem, getValidationsUser }) => {
  const {
    toggle,
    setToggle,
    log,
    preVentas,
    getRops,
    getUser,
    carrito,
    rol,
    valueSearch,
  } = useContext(AppContext);

  const notify = () => {
    toast.error("Inicia sesión!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  function changeToggle() {
    let menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
    setToggle(!toggle);
  }

  async function searchTitle(title) {
    const prods = await searchForTitle(title);
  }

  function openCart() {
    carrito.current.classList.toggle("hidden");
    getUser();
  }

  async function generarReporte() {
    const datos = await reporteMensual();
    const comprobantes = datos.data;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Reporte de ventas", 10, 10);

    const data = [
      [
        "Cliente",
        "Tipo de Comprobante",
        "Documento Identidad",
        "Número Documento",
        "Total",
      ],
      ...comprobantes.map((venta) => [
        `${venta.nombres.nombre} ${venta.nombres.apellido}`,
        venta.tipoComprobante,
        venta.documentoIde,
        venta.numDocumento,
        venta.total.toFixed(2),
      ]),
    ];

    const total = data
      .slice(1)
      .reduce((acc, current) => acc + Number(current[4]), 0);

    const totalRow = ["", "", "", "Total:", total.toFixed(2)];

    data.push(totalRow);

    doc.autoTable({
      head: [data[0]],
      body: data.slice(1),
    });
    doc.save("reporte.pdf");
  }

  useEffect(() => {
    changeItem();
    console.log(preVentas);
  }, []);

  return (
    <div>
      <div className="bg-black h-28">
        <div className="text-white justify-items-center text-center p-7">
          <h2 className="font-bold text-2xl">
            NUEVA COLECCIÓN DISPONIBLE
            <a href="/" className="text-blue-400">
              {" "}
              AQUÍ
            </a>
          </h2>
          <p>
            ¡LLÉVATE UN{" "}
            <strong>
              <u>POLO OVERSIZE DE REGALO</u>
            </strong>
            POR COMPRAS MAYORES A 250 SOLES!
          </p>
        </div>
      </div>
      <nav
        className="flex items-center  bg-white w-full h-auto shadow-lg justify-between lg:px-80  top-0 gap-14 flex-wrap"
        style={{
          zIndex: "2",
        }}
      >
        <div>
          <img src="/logo.png" className="w-24" />
        </div>
        <div className="lg:hidden">
          <button onClick={changeToggle}>
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={toggle ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}
              />
            </svg>
          </button>
        </div>
        <div
          id="menu"
          className="w-full block flex-grow lg:flex lg:items-center lg:w-auto"
        >
          <div className="lg:flex-grow">
            <a className="itemsa" href="/">
              Inicio
            </a>
            {!log ? (
              <a className="itemsb" href="/login">
                Hola,
                <br />
                Inicia sesión
              </a>
            ) : (
              <div
                className="itemsb text-lg hover:cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("login");
                  changeItem();
                }}
              >
                Cerrar sesión
              </div>
            )}
            <a
              className="itemsb"
              /* href={
                getValidationsUser() !== null &&
                `/carrito/${getValidationsUser()}`
              } */

              onClick={() => {
                getValidationsUser() === null ? notify() : openCart();
              }}
            >
              <div className="flex">
                <AiOutlineShoppingCart className="mt-2"></AiOutlineShoppingCart>
                <p className="hover:cursor-pointer">Carrito</p>
                {preVentas !== 0 && (
                  <div className="-ml-0.5 rounded-full  bg-red-500 text-white w-5 text-center text-sm h-5">
                    {preVentas}
                  </div>
                )}
              </div>
            </a>
            {rol == "admin" && (
              <a
                className="itemsb"
                /* href={
                  getValidationsUser() !== null &&
                  `/carrito/${getValidationsUser()}`
                } */
              >
                <button
                  onClick={generarReporte}
                  className="mt-6 flex w-full items-center  justify-center rounded-md border border-transparent bg-black py-3 px-8 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Generar reporte de ventas
                </button>
              </a>
            )}
          </div>
        </div>
        <Buscador valueSearch={valueSearch} getRops={getRops} />
      </nav>
    </div>
  );
};

export default Header;
