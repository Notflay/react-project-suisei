import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineDropbox } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { AppContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ changeItem }) => {
  const { toggle, setToggle, log, preVentas } = useContext(AppContext);

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

  function getValidationsUser() {
    const item = localStorage.getItem("login");
    return item;
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
              <a className="itemsb" href="/registro">
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
              href={
                getValidationsUser() !== null &&
                `/carrito/${getValidationsUser()}`
              }
              onClick={() => {
                getValidationsUser() === null && notify();
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

            <a className="itemsb" href="/login">
              <div className="flex">
                <AiOutlineDropbox className="mt-2"></AiOutlineDropbox>
                <p className="">Iniciar Sesion</p>
              </div>
            </a>
          </div>
        </div>
        <div
          className="w-full absolute lg:w-auto left-1"
          style={{
            height: "50px",
            borderRadius: "150px",
            backgroundColor: "#fff",
            width: "650px",
            marginLeft: "1150px",
          }}
        >
          <input
            style={{
              background: "transparent",
              marginLeft: "25px",
              marginTop: "10px",
              fontSize: "18px",
              fontWeight: "400",
              width: "90%",
              outline: "none",
              color: "#333",
              position: "absolute",
              letterSpacing: ".2px",
              textAlign: "left",
            }}
            placeholder="Buscar en Suisei.com"
          ></input>
          <div
            style={{
              marginLeft: "100%",
              marginTop: "",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                position: "absolute",
                marginLeft: "-40px",
                marginTop: "0px",
                width: "50px",
                height: "50px",
                backgroundColor: "#f64242",
                borderRadius: "100%",
              }}
            >
              <FaSearch
                style={{
                  fontSize: "25px",
                  textAlign: "center",
                  marginLeft: "10px",
                  marginTop: "13px",
                }}
              ></FaSearch>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
