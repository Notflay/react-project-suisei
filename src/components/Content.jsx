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
    log,
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
    let promises = [];
    let prods = null;

    if (dif === null && col.length === 0) {
      promises.push(getRopa(page));
    } else if (dif !== null && col.length === 0) {
      const prod = {
        product: dif.id,
      };
      promises.push(getRopFilt(page, prod));
    } else if (dif === null && col.length !== 0) {
      if (col.length < 1) {
        promises.push(getRopa(1));
      } else {
        promises.push(getColFilt(page, col));
      }
    }

    try {
      const responses = await Promise.all(promises);
      responses.forEach((response) => {
        prods = response.data.products;
        setProducts(orderProduct(prods, ord));
        setTotal(response.data.totalItems);
        setFiltcol(col);
        setOrder(ord);
        setFilt(dif);
      });
    } catch (error) {
      console.log(error);
    }
  }
  /*   async function getRops(page = 1, dif = filt, col = filtcol, ord = order) {
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
  } */

  useEffect(() => {
    getRops();
  }, [filt, filtcol]);

  return (
    <div
    /*
      className={`lg:my-24 ${
        toggle ? "max-[600px]:mt-36" : "max-[600px]:mt-96"
      }`}*/
    >
      <br />
      <hr className="w-4/6  m-auto" />
      <div className="mx-auto max-w-6xl m-auto flex pt-7 ">
        {/* Grid in 2 columns */}
        <div className="w-80 max-[700px]:m-auto">
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
