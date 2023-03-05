import React, { useContext, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { AppContext } from "../../App";

const Header = () => {
  const { toggle, setToggle } = useContext(AppContext);

  function changeToggle() {
    let menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
    setToggle(!toggle);
  }

  return (
    <nav
      className="flex items-center bg-current w-full h-auto shadow-lg justify-between px-8 fixed top-0 gap-14 flex-wrap"
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
          <a className="itemsa">Inicio</a>
          <a className="itemsb">
            Hola,
            <br />
            Inicia sesión
          </a>
          <a className="itemsb">
            <div className="flex">
              <AiOutlineShoppingCart className="mt-2"></AiOutlineShoppingCart>
              <p className="">Carrito</p>
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
  );
};

export default Header;
