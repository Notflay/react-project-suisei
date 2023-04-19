import React, { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import { createCart, getProduct } from "../../services/axios.service";
import { AppContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfoProduct from "./InfoProduct";

const Catalogo = ({ products }) => {
  const [size, setSize] = useState(null);
  const [cantidad, setCantidad] = useState(0);

  const details = useRef(null);
  const [stock, setStock] = useState(0);
  const [prodId, setProdId] = useState();
  const { setPreCompra, preCompra, log, changeItem, getValidationsUser, rol } =
    useContext(AppContext);

  const notify = () => {
    if (!log) {
      toast.error("Inicia sesión!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (size === null || cantidad === 0) {
      toast.error("Escoje la cantidad!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      pushCart();
    }
  };

  async function getProd(id) {
    const prod = await getProduct(id);
    setProdId(prod.data);
    console.log(prod.status);
    details.current.classList.toggle("hidden");
  }

  async function pushCart() {
    await createCart(`${getValidationsUser()}`, {
      _id: prodId._id,
      cantidad: cantidad,
      talla: size,
    }).then((response) => {
      changeItem();
    });
  }

  const callOptionFunction = () => {
    const select = document.getElementById("selectSize");
    const selectedOption = select.options[select.selectedIndex].value;

    //call your parametric function

    //or call a different function based on the selected option value
    switch (selectedOption) {
      case "S":
        setStock(prodId.modelPerColors[0].clothingSize.size.rows[0]);
        setSize("S");
        break;
      case "M":
        setStock(prodId.modelPerColors[0].clothingSize.size.rows[1]);
        setSize("M");
        break;
      case "L":
        setStock(prodId.modelPerColors[0].clothingSize.size.rows[2]);
        setSize("L");
        break;
    }
  };

  const callOptionFunctionStock = () => {
    const select = document.getElementById("selectCantidad");
    const selectedOption = select.options[select.selectedIndex].value;

    //call your parametric function

    //or call a different function based on the selected option value
    console.log(selectedOption);
    switch (selectedOption) {
      case "1":
        setCantidad(1);
        break;
      case "2":
        setCantidad(2);
        break;
      case "3":
        setCantidad(3);
        break;
    }
  };

  return (
    <div className=" bg-white my-2">
      <hr className="py-2" />

      <div className="grid grid-flow-row-dense grid-cols-3 max-[700px]:grid-cols-1 gap-3 ">
        {products.map((data, key) =>
          rol == "admin" ? (
            <motion.div
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer border border-r"
              style={{ width: "95%", borderRadius: ".28571429rem" }}
              key={key}
              onClick={() => {
                getProd(data._id);
              }}
            >
              <img
                src={data.modelPerColors[0].urlImage}
                className="w-full"
                style={{ height: "62%" }}
              />

              <div
                className="flex justify-around h-8 items-center "
                style={{ borderBottomWidth: "0.5px" }}
              >
                <span style={{ color: "#888" }}>S</span>
                <span style={{ color: "#888" }}>M</span>
                <span style={{ color: "#888" }}>L</span>
              </div>
              <div className="text-left pb-2 px-4">
                <p className="py-4">
                  {data.name.slice(0, 1) +
                    data.name.slice(1, data.name.length).toLowerCase()}
                </p>
                <p className="font-semibold">
                  S/ {data.modelMoneyValueId.costPrice}
                </p>
              </div>
              <div style={{ borderTopWidth: "0.5px" }}>
                <p className="py-2 px-5">
                  <span
                    style={{
                      height: "25px",
                      width: "25px",
                      backgroundColor: `${data.modelPerColors[0].color.code}`,
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  ></span>
                </p>
              </div>
            </motion.div>
          ) : (
            data.modelStatId == "5f39d30512aceb44597d79d2" && (
              <motion.div
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer border border-r"
                style={{ width: "95%", borderRadius: ".28571429rem" }}
                key={key}
                onClick={() => {
                  getProd(data._id);
                }}
              >
                <img
                  src={data.modelPerColors[0].urlImage}
                  className="w-full"
                  style={{ height: "62%" }}
                />

                <div
                  className="flex justify-around h-8 items-center "
                  style={{ borderBottomWidth: "0.5px" }}
                >
                  <span style={{ color: "#888" }}>S</span>
                  <span style={{ color: "#888" }}>M</span>
                  <span style={{ color: "#888" }}>L</span>
                </div>
                <div className="text-left pb-2 px-4">
                  <p className="py-4">
                    {data.name.slice(0, 1) +
                      data.name.slice(1, data.name.length).toLowerCase()}
                  </p>
                  <p className="font-semibold">
                    S/ {data.modelMoneyValueId.costPrice}
                  </p>
                </div>
                <div style={{ borderTopWidth: "0.5px" }}>
                  <p className="py-2 px-5">
                    <span
                      style={{
                        height: "25px",
                        width: "25px",
                        backgroundColor: `${data.modelPerColors[0].color.code}`,
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    ></span>
                  </p>
                </div>
              </motion.div>
            )
          )
        )}
      </div>

      {/* VENTANA ADICIONAL */}

      <InfoProduct
        prodId={prodId}
        callOptionFunction={callOptionFunction}
        callOptionFunctionStock={callOptionFunctionStock}
        notify={notify}
        setSize={setSize}
        setStock={setStock}
        setCantidad={setCantidad}
        details={details}
        stock={stock}
        rol={rol}
      />
    </div>
  );
};

export default Catalogo;
