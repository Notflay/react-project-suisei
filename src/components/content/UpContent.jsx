import React, { useContext, useEffect, useRef, useState } from "react";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { AppContext } from "../../App";

const UpContent = ({ setPage, getRops }) => {
  const [actDrop, setActDrop] = useState(false); //
  const first = useRef(null);
  const lione = useRef(null);
  const litwo = useRef(null);
  const lithre = useRef(null);
  const [lipric, setLipric] = useState("Recomendados");
  const [orden, setOrden] = useState(1);

  const { bottons, products, setProducts, setOrder, filt, filtcol } =
    useContext(AppContext);

  let num = bottons;
  let items = [];
  let activeBtn = 1;

  const btn1 = useRef(null);

  const handleClick = (i) => {
    try {
      getRops(i);
      activeBtn = i;
      //Obtenemos todos los botones y removemos la clase bg - red - 50
      const buttons = document.querySelectorAll("a");
      buttons.forEach((button) => {
        button.classList.remove("bg-red-50");
        button.classList.remove("border-red-300");
      });
      // Agregamos la clase bg-red-50 al botón activo
      const activeButton = document.getElementById(`btn${activeBtn}`);
      activeButton.classList.add("bg-red-50");
      activeButton.classList.add("border-red-300");
    } catch (error) {
      console.log(error.message);
    }
  };

  for (let i = 1; i <= num; i++) {
    if (num > 7) {
      // Se calcula los botones que deberían estar ocultos restando la {totalidad - 6 }
      if (i > 4 && i < num - 1) {
        items.push(
          <a
            tabIndex={0}
            id={`btn${i}`}
            aria-current="page"
            className={`cursor-pointer border relative z-10 hidden items-center px-4 py-2 text-sm font-medium 
            text-gray-500 focus:z-20 hover:bg-gray-50}`}
            onClick={() => {
              handleClick(i);
            }}
            ref={btn1}
          >
            {i}
          </a>
        );
        if (i === num - 2) {
          items.push(
            <a
              tabIndex={0}
              aria-current="page"
              className={`cursor-pointer border relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium 
              text-gray-500 focus:z-20 `}
              onClick={() => {}}
            >
              ...
            </a>
          );
        }
      } else {
        items.push(
          <a
            id={`btn${i}`}
            tabIndex={0}
            aria-current="page"
            className={`cursor-pointer border relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium 
            text-gray-500 focus:z-20 hover:bg-gray-50}  ${
              activeBtn === i && "bg-red-50 border-red-300"
            }`}
            onClick={() => {
              handleClick(i);
            }}
            ref={btn1}
          >
            {i}
          </a>
        );
      }
    } else {
      items.push(
        <a
          id={`btn${i}`}
          tabIndex={0}
          aria-current="page"
          className={`cursor-pointer border relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium 
        text-gray-500 focus:z-20 hover:bg-gray-50} ${
          activeBtn === i && "bg-red-50 border-red-300"
        }`}
          onClick={() => {
            handleClick(i);
          }}
          ref={btn1}
        >
          {i}
        </a>
      );
    }
  }

  return (
    <div className="bg-white h-24 flex flex-row gap-5">
      <div className="pt-4 flex flex-col">
        <div style={{ color: "#888" }} className="text-xs pl-8 ">
          Ordenar por:{" "}
        </div>
        <div
          className="w-56 ml-8 pl-0 h-8 flex flex-row justify-between border-b-2 cursor-pointer "
          tabIndex={0}
          onClick={() => {
            if (first) {
              first.current.classList.toggle("hidden");
              setActDrop(!actDrop);
            }
          }}
          onBlur={() => {
            setTimeout(() => {
              if (first) {
                first.current.classList.toggle("hidden");
                setActDrop(!actDrop);
              }
            }, 200);
          }}
        >
          <div id="li-pric" className="">
            {lipric}
          </div>
          <div className="mt-1">
            {actDrop ? (
              <TfiAngleUp></TfiAngleUp>
            ) : (
              <TfiAngleDown></TfiAngleDown>
            )}
          </div>
        </div>
        <div
          className="ml-8 w-56 hidden"
          id="dropdown"
          ref={first}
          style={{ position: "relative", zIndex: 1 }}
        >
          <ul className="bg-white">
            <div
              className="hover:border-l-2 border-red-500 cursor-pointer"
              onClick={() => {
                console.log("click");
                setLipric(lione.current.textContent);
              }}
            >
              <li
                className="hover:bg-gray-100 p-2"
                id="li-rec"
                ref={lione}
                onClick={() => {
                  getRops(1, filt, filtcol, null);
                }}
              >
                Recomendados
              </li>
            </div>
            <div
              className="hover:border-l-2 border-red-500 cursor-pointer"
              onClick={() => {
                setLipric(litwo.current.textContent);
              }}
            >
              <li
                className="hover:bg-gray-100 p-2 black "
                id="li-pme"
                ref={litwo}
                onClick={() => {
                  getRops(1, filt, filtcol, true);
                }}
              >
                Precio de menor a mayor
              </li>
            </div>
            <div
              className="hover:border-l-2 border-red-500 cursor-pointer"
              onClick={() => {
                setLipric(lithre.current.textContent);
              }}
            >
              <li
                className="hover:bg-gray-100 p-2"
                id="li-pma"
                ref={lithre}
                onClick={() => {
                  getRops(1, filt, filtcol, false);
                }}
              >
                Precio de mayor a menor
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div className="ml-40 pt-7 flex">
        {items.length > 1 && (
          <span
            style={{ color: "#888", marginTop: "5px" }}
            className="text-xs "
          >
            Páginas:
          </span>
        )}
        <div className="flex items-center justify-between bg-white px-4 pb-6 pb- sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              {items.length > 1 && (
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <div>
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                      onClick={() => {
                        if (orden > 1) {
                          document
                            .getElementById(`btn${orden - 1}`)
                            .classList.toggle("hidden");
                          document
                            .getElementById(`btn${orden + 3}`)
                            .classList.toggle("hidden");
                          setOrden(orden - 1);
                        }
                      }}
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                  <div>{items}</div>
                  <div>
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                      onClick={() => {
                        if (orden < num - 5) {
                          document
                            .getElementById(`btn${orden}`)
                            .classList.toggle("hidden");
                          document
                            .getElementById(`btn${orden + 4}`)
                            .classList.toggle("hidden");
                          setOrden(orden + 1);
                        }
                      }}
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpContent;
