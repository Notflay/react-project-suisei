import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";

import Catalogo from "./content/Catalogo";

import Filtrado from "./content/Filtrado";
import UpContent from "./content/UpContent";
import MiniCarrito from "./content/MiniCarrito";
import { getProduct, getUsuario } from "../services/axios.service";

const Content = ({ carrito }) => {
  const {
    toggle,
    setToggle,
    setProducts,
    products,
    setTotal,
    setFilt,
    filt,
    filtcol,
    order,
    setFiltcol,
    setOrder,
    log,
    setFiltName,
    filtName,
    getRops,
  } = useContext(AppContext);

  return (
    <div
    /*
      className={`lg:my-24 ${
        toggle ? "max-[600px]:mt-36" : "max-[600px]:mt-96"
      }`}*/
    >
      <br />
      <MiniCarrito log={log} className="hidden" carrito={carrito} />
      <hr className="w-4/6  m-auto" />
      <div className="mx-auto max-w-6xl m-auto flex pt-7 ">
        {/* Grid in 2 columns */}
        <div className="w-80 max-[700px]:m-auto ">
          <Filtrado getRops={getRops} filt={filt} setFilt={setFilt} />
        </div>
        <div className="w-full flex-grow lg:pl-2 max-[700px]:hidden">
          <UpContent getRops={getRops} />
          <Catalogo products={products} log={log} />
        </div>
      </div>
      <div className="pt-2 w-4/6 m-auto">
        <div className="w-full flex-grow lg:pl-2 lg:hidden">
          <UpContent getRops={getRops} />
          <Catalogo products={products} log={log} />
        </div>
      </div>
    </div>
  );
};

export default Content;
