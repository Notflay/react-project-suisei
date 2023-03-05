import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";
import { getColFilt, getRopa, getRopFilt } from "../services/axios.service";
import Catalogo from "./content/Catalogo";

import Filtrado from "./content/Filtrado";
import UpContent from "./content/UpContent";

const Content = () => {
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
  } = useContext(AppContext);

  const orderProduct = (products, ord) => {
    if (ord === true) {
      return products.sort(function (a, b) {
        if (a.modelMoneyValueId.costPrice > b.modelMoneyValueId.costPrice) {
          return 1;
        }
        if (a.modelMoneyValueId.costPrice < b.modelMoneyValueId.costPrice) {
          return -1;
        }
        return 0;
      });
    } else if (ord === false) {
      return products.sort(function (a, b) {
        if (a.modelMoneyValueId.costPrice < b.modelMoneyValueId.costPrice) {
          return 1;
        }
        if (a.modelMoneyValueId.costPrice > b.modelMoneyValueId.costPrice) {
          return -1;
        }
        return 0;
      });
    } else {
      return products;
    }
  };  

  async function getRops(page = 1, dif = filt, col = filtcol, ord = order) {
    if (dif === null && col == null) {
      const prods = await getRopa(page);
      setProducts(orderProduct(prods.data.products, ord));
      setTotal(prods.data.totalItems);
      setOrder(ord);
    } else if (dif !== null && col === null) {
      const prod = {
        product: dif.id,
      };
      const prods = await getRopFilt(page, prod);
      setProducts(orderProduct(prods.data.products, ord));
      setTotal(prods.data.totalItems);
      setOrder(ord);
      setFilt(dif);
    } else if (dif === null && col !== null) {
      if (col.length < 1) {
        getRops(1, null, null);
      } else {
        const prods = await getColFilt(page, col);
        setProducts(orderProduct(prods.data.products, ord));
        setTotal(prods.data.totalItems);
        setFiltcol(col);
        setOrder(ord);
        setFilt(dif);
      }
    }
  }

  useEffect(() => {
    getRops();
  }, [filt, filtcol]);

  return (
    <div
      className={`lg:my-24 ${
        toggle ? "max-[600px]:mt-36" : "max-[600px]:mt-96"
      }`}
    >
      <div className="w-4/6 m-auto flex pt-2">
        {/* Grid in 2 columns */}
        <div className="w-80">
          <Filtrado getRops={getRops} filt={filt} setFilt={setFilt} />
        </div>
        <div className="w-full flex-grow pl-2">
          <UpContent getRops={getRops} />
          <Catalogo products={products} />
        </div>
      </div>
    </div>
  );
};

export default Content;
