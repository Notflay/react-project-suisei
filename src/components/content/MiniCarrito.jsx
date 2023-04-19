import React, { useContext, useRef } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import {
  deleteCart,
  getProduct,
  getUsuario,
} from "../../services/axios.service";
import { useState } from "react";
import { AppContext } from "../../App";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MiniCarrito = ({ carrito }) => {
  const { totalPre, produc, getValidationsUser, getUser, changeItem } =
    useContext(AppContext);

  const notify = () => {
    toast.error("Añade productos al carrito", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  async function deleteCartObj(id, objid) {
    await deleteCart(id, objid)
      .then((response) => {
        getUser();
        changeItem();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function getDatosCarro() {
    if (localStorage.getItem("login")) {
      await contCart(localStorage.getItem("login")).then((response) => {
        setPreVentas(response.data.cantidad);
      });
      setLog(true);
    } else {
      setPreVentas(0);
      setLog(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <div
        ref={carrito}
        className="hidden"
        tabIndex={0}
        onBlur={() => {
          setTimeout(() => {
            if (carrito) {
              carrito.current.classList.toggle("hidden");
            }
          }, 200);
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "300px",
            height: "374px",
            position: "absolute",
            marginTop: "-45px",
            marginLeft: "680px",
            borderRadius: "10px",
            border: "1px solid #b4b4b4",
            boxSizing: "border-box",
            fontWeight: "500",
            zIndex: "1000000",
          }}
        >
          <div className="cotainer">
            <br />
            <div style={{ marginLeft: "20px", height: "50px" }}>
              <button style={{ border: "none", backgroundColor: "white" }}>
                <BsFillTrashFill></BsFillTrashFill>
              </button>
              <span className="fas fa-trash" style={{ padding: "3px" }}></span>
              Sub total
              <b style={{ marginLeft: "15px" }}>S/ {totalPre.toFixed(2)}</b>
              <br
                style={{
                  border: "0",
                  borderTop: "1px solid rgba(0,0,0,.1)",
                  boxSizing: "initial",
                  height: "0",
                }}
              />
            </div>

            <div className="w-100">
              <hr />
            </div>
            <div
              style={{
                position: "absolute",
                width: "298px",
                background: "#fff",
                height: "auto",

                boxSizing: "border-box",
                fontFamily: "Roboto,Helvetica Neue,sans-serif",
                fontWeight: "300",
                maxHeight: "240px",
                marginTop: "-15px",
              }}
            >
              <ul
                style={{
                  padding: "0",
                  margin: "0",
                  maxHeight: "240px",
                  overflowY: "auto",
                  boxSizing: "border-box",
                  fontFamily: "Roboto,Helvetica Neue,sans-serif",
                  fontWeight: "300",
                  textAlign: "left",
                }}
              >
                {produc.length > 0
                  ? produc.map((pre, key) => {
                      return (
                        <li
                          style={{
                            position: "relative",
                            listStyle: "none",
                            padding: "5px",

                            fontFamily: "Roboto,Helvetica Neue,sans-serif",
                            fontWeight: "300",
                            fontSize: "1rem",
                            lineHeight: "1.5",
                            color: "#212529",
                            textAlign: "left",
                          }}
                          key={key}
                        >
                          <div style={{ marginBottom: "45px" }}>
                            <img
                              src={pre.product.modelPerColors[0].urlImage}
                              alt="data"
                              style={{
                                heigth: "105px",
                                width: "75px",
                                boxShadow: "5px",
                              }}
                            ></img>
                            <p
                              style={{
                                position: "absolute",
                                marginLeft: "100px",
                                marginTop: "-80px",
                                fontWeight: "bold",
                              }}
                            >
                              {pre.product.name}
                            </p>
                            <p
                              style={{
                                position: "absolute",
                                marginLeft: "10px",
                                marginTop: "2px",
                              }}
                            >
                              S/
                              {(
                                pre.product.modelMoneyValueId.costPrice *
                                pre.cantidad
                              ).toFixed(2)}
                            </p>
                            <p
                              style={{
                                position: "absolute",
                                marginLeft: "100px",
                                marginTop: "2px",
                              }}
                            >
                              Cantidad: {pre.cantidad}
                            </p>
                          </div>
                          <BsFillTrashFill
                            style={{
                              position: "absolute",
                              marginTop: "-45px",
                              marginLeft: "230px",
                              width: "40px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              deleteCartObj(
                                localStorage.getItem("login"),
                                pre.product._id
                              );
                            }}
                          ></BsFillTrashFill>
                          <hr />
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
            <hr style={{ marginTop: "240px" }} />
            <div className="row w-100">
              <div className="col-sm-12 p-3">
                <button
                  className="bg-red-400"
                  style={{
                    backgroundColor: "",
                    borderColor: "orange",
                    borderRadius: "5px",
                    fontWeight: "600",
                    marginLeft: "25px",
                    marginTop: "-29px",
                    width: "250px",
                    height: "45px",
                    cursor: "pointer",
                  }}
                >
                  <a
                    /*    href={
                    getValidationsUser() !== null &&
                    `/carrito/${getValidationsUser()}`
                  } */

                    href={
                      produc.length > 0 && `/carrito/${getValidationsUser()}`
                    }
                    onClick={() => {
                      if (produc.length < 1) notify();
                    }}
                  >
                    Ver carrito
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MiniCarrito;
