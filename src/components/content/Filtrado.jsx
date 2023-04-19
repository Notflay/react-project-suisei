import React, { useContext, useEffect, useState } from "react";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { AiOutlineClose } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { AppContext } from "../../App";
import { getRopa, getTypePrd } from "../../services/axios.service";

const Filtrado = ({ getRops, filt, setFilt }) => {
  const [active, setActive] = useState(false);
  const [types, setTypes] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedCat, setIsExpandedCat] = useState(false);
  const [isExpendedPre, setIsExpendedPre] = useState(false);
  const [isExpandedCol, setIsExpandedCol] = useState(false);
  const [colores, setColores] = useState([]);

  const { total, filtName, setFiltName } = useContext(AppContext);

  async function getTypesProducts() {
    const response = await getTypePrd();
    setTypes(response.data);
  }

  const handleColorType = async (id, color) => {
    const newColores = [...colores, { id, color }];
    setColores(newColores);

    await getRops(1, null, newColores);
  };

  const handleDltColor = async (id) => {
    let lista = [...colores];
    if (lista.length < 1) {
      console.log(vacio);
      await getRops(1, null, null);
    } else {
      lista = lista.filter((data) => data.id !== id);
      setColores(lista);
      setFilt(null);
      await getRops(1, null, lista);
    }
  };

  useEffect(() => {
    getTypesProducts();
  }, []);

  return (
    <div className="bg-white h-auto">
      <div className="border-b-2 border-indigo-500 w-full mb-2">
        <p className="text-xs" style={{ color: "#888", padding: "9px" }}>
          Resultados: {total}
        </p>
      </div>
      {filt ? (
        <div className="border-b-2 border-indigo-500 w-full">
          <div className="pb-2 font-semibold flex">
            <h1 className="ml-3">Filtro seleccionado</h1>
            <span className="ml-28">
              <AiOutlineClose style={{ fontSize: "20px" }}></AiOutlineClose>
            </span>
          </div>
          <div className="ml-3 p-2 flex gap-2">
            <button
              className="border block border-red-500 text-xs"
              onClick={() => {
                setFilt(null);
              }}
            >
              {filt.name} <RiCloseLine></RiCloseLine>
            </button>
          </div>
        </div>
      ) : filtName ? (
        <div className="border-b-2 border-indigo-500 w-full">
          <div className="pb-2 font-semibold flex">
            <h1 className="ml-3">Filtro seleccionado</h1>
            <span className="ml-28">
              <AiOutlineClose style={{ fontSize: "20px" }}></AiOutlineClose>
            </span>
          </div>
          <div className="ml-3 p-2 flex gap-2">
            <button
              className="border block border-red-500 text-xs"
              onClick={() => {
                setFiltName(null);
              }}
            >
              {filtName} <RiCloseLine></RiCloseLine>
            </button>
          </div>
        </div>
      ) : null}
      <ul className="p-4">
        <div
          className="h-20 w-full justify-center p-3  rounded-xl grid grid-cols-3 mt-2 mb-6"
          id="filtCart"
        >
          <div>
            <MdOutlineDeliveryDining
              style={{ fontSize: "30px" }}
            ></MdOutlineDeliveryDining>
          </div>
          <div>
            <span className="font-semibold text-xs">Envío gratis </span>
          </div>
          <div>
            <span className="">
              {active ? (
                <BsToggleOn
                  style={{
                    fontSize: "25px",
                    color: "#D72C16",
                  }}
                  onClick={() => {
                    setActive(!active);
                  }}
                ></BsToggleOn>
              ) : (
                <BsToggleOff
                  style={{ fontSize: "25px", color: "#D72C16" }}
                  onClick={() => {
                    setActive(!active);
                  }}
                ></BsToggleOff>
              )}
            </span>
          </div>
          <div className="col-span-3">
            <span className="text-xs">En productos pequeños desde S/ 99</span>
          </div>
        </div>

        <li className="mt-1">
          <button
            className="flex w-full"
            onClick={() => {
              setIsExpanded(!isExpanded);
              document.getElementById("itemOne").classList.toggle("hidden");
            }}
          >
            <div>
              <h2 className="text-xl" style={{ fontWeight: "400" }}>
                Envio Rápido
              </h2>
            </div>
            <span className="ml-32">
              {isExpanded ? (
                <TfiAngleUp style={{ fontSize: "25px" }}></TfiAngleUp>
              ) : (
                <TfiAngleDown
                  className=""
                  style={{ fontSize: "25px" }}
                ></TfiAngleDown>
              )}
            </span>
          </button>
          <div className="py-2 hidden" id="itemOne">
            <ul>
              <li className="pb-2">
                <label>
                  <span className="hover:underline cursor-pointer">
                    Envio rápido
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </li>
        <li className="my-3">
          <button
            className="flex w-full"
            onClick={() => {
              setIsExpandedCat(!isExpandedCat);
              document.getElementById("itemTwo").classList.toggle("hidden");
            }}
          >
            <div>
              <h2 className="text-xl " style={{ fontWeight: "400" }}>
                Categoría
              </h2>
            </div>
            <span className="itemLef">
              {isExpandedCat ? (
                <TfiAngleUp style={{ fontSize: "25px" }}></TfiAngleUp>
              ) : (
                <TfiAngleDown
                  className=""
                  style={{ fontSize: "25px" }}
                ></TfiAngleDown>
              )}
            </span>
          </button>
          <div className="py-2 hidden" id="itemTwo">
            <ul className="">
              {types.map((data, index) => (
                <li className="pb-2" key={index}>
                  <span
                    className="hover:underline cursor-pointer "
                    onClick={() => {
                      getRops(1, { name: data.name, id: data._id });
                    }}
                  >
                    {data.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </li>

        <li className="my-3">
          <button
            className="flex w-full"
            onClick={() => {
              setIsExpandedCol(!isExpandedCol);
              document.getElementById("itemFor").classList.toggle("hidden");
            }}
          >
            <div>
              <h2 className="text-xl" style={{ fontWeight: "400" }}>
                Color
              </h2>
            </div>
            <span style={{ marginLeft: "196px" }}>
              {!isExpandedCol ? (
                <TfiAngleDown
                  className=""
                  style={{ fontSize: "25px" }}
                ></TfiAngleDown>
              ) : (
                <TfiAngleUp style={{ fontSize: "25px" }}></TfiAngleUp>
              )}
            </span>
          </button>
          <div className="py-2 hidden" id="itemFor">
            <ul>
              <li className="pb-2">
                <label>
                  <input
                    type={"checkbox"}
                    className="valid:border-green-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleColorType("623ccee7060747724e9f4765", "Blanco");
                      } else {
                        handleDltColor("623ccee7060747724e9f4765");
                      }
                    }}
                  />
                  <span> Blanco</span>
                </label>
              </li>
              <li className="pb-2">
                <label>
                  <input
                    type={"checkbox"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleColorType("5f5065fd3582a106b705e7bc", "Negro");
                      } else {
                        handleDltColor("5f5065fd3582a106b705e7bc");
                      }
                    }}
                  />
                  <span> Negro</span>
                </label>
              </li>
              <li className="pb-2">
                <label>
                  <input
                    type={"checkbox"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleColorType("5f4d8a553582a106b705e7ac", "Amarillo");
                      } else {
                        handleDltColor("5f4d8a553582a106b705e7ac");
                      }
                    }}
                  />
                  <span> Amarillo</span>
                </label>
              </li>
              <li className="pb-2">
                <label>
                  <input
                    type={"checkbox"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleColorType("610850cda638d721f25efa33", "Azul");
                      } else {
                        handleDltColor("610850cda638d721f25efa33");
                      }
                    }}
                  />
                  <span> Azul</span>
                </label>
              </li>
              <li className="pb-2">
                <label>
                  <input
                    type={"checkbox"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleColorType("60c9399558d5666491a3fd29", "Verde");
                      } else {
                        handleDltColor("60c9399558d5666491a3fd29");
                      }
                    }}
                  />
                  <span> Verde</span>
                </label>
              </li>
              <li className="pb-2">
                <label>
                  <input
                    type={"checkbox"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleColorType("5f51b2333582a106b705e7d0", "Rojo");
                      } else {
                        handleDltColor("5f51b2333582a106b705e7d0");
                      }
                    }}
                  />
                  <span> Rojo</span>
                </label>
              </li>
              <li className="pb-2">
                <label>
                  <input
                    type={"checkbox"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleColorType("6234ab8b060747724e9f4369", "Marron");
                      } else {
                        handleDltColor("6234ab8b060747724e9f4369");
                      }
                    }}
                  />
                  <span> Marron</span>
                </label>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Filtrado;
