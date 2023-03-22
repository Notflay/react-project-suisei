import React, { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getProduct } from "../../services/axios.service";
import { AppContext } from "../../App";

const Catalogo = ({ products }) => {
  const { setPreCompra, preCompra } = useContext(AppContext);

  const [size, setSize] = useState(null);
  const [cantidad, setCantidad] = useState(0);

  const details = useRef(null);
  const [stock, setStock] = useState(0);
  const [prodId, setProdId] = useState();

  async function getProd(id) {
    const prod = await getProduct(id);
    setProdId(prod.data);
    details.current.classList.toggle("hidden");
  }

  return (
    <div className=" bg-white my-2">
      <hr className="py-2" />

      <div className="grid grid-flow-row-dense grid-cols-3 max-[700px]:grid-cols-1 gap-3 ">
        {products.map((data, key) => (
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
        ))}
      </div>

      {/* VENTANA ADICIONAL */}

      <div
        className="relative z-10 hidden"
        role="dialog"
        aria-modal="true"
        ref={details}
        id="detalles"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>
        {prodId ? (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-5xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      onClick={() => {
                        document
                          .getElementById("detalles")
                          .classList.add("hidden");
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg  sm:col-span-4 lg:col-span-5 ">
                      <img
                        src={prodId.modelPerColors[0].urlImage}
                        alt="Two each of gray, white, and black shirts arranged on table."
                        className="object-cover object-center zoom"
                      />
                    </div>

                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        {prodId.name}
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <p className="text-2xl text-gray-900">
                          S/ {prodId.modelMoneyValueId.costPrice}
                        </p>

                        <div className="mt-6">
                          <h4 className="sr-only">Reviews</h4>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              <svg
                                className="text-gray-900 h-5 w-5 flex-shrink-0"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                  clip-rule="evenodd"
                                />
                              </svg>

                              <svg
                                className="text-gray-900 h-5 w-5 flex-shrink-0"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                  clip-rule="evenodd"
                                />
                              </svg>

                              <svg
                                className="text-gray-900 h-5 w-5 flex-shrink-0"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                  clip-rule="evenodd"
                                />
                              </svg>

                              <svg
                                className="text-gray-900 h-5 w-5 flex-shrink-0"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                  clip-rule="evenodd"
                                />
                              </svg>

                              <svg
                                className="text-gray-200 h-5 w-5 flex-shrink-0"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </div>
                            <p className="sr-only">3.9 out of 5 stars</p>
                            <a
                              href="#"
                              className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              117 reviews
                            </a>
                          </div>
                        </div>
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-10"
                      >
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        <form>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              Color
                            </h4>

                            <fieldset className="mt-4">
                              <legend className="sr-only">
                                Choose a color
                              </legend>
                              <span className="flex items-center space-x-3">
                                <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                                  <input
                                    type="radio"
                                    name="color-choice"
                                    value="White"
                                    className="sr-only"
                                    aria-labelledby="color-choice-0-label"
                                  />
                                  <span
                                    id="color-choice-0-label"
                                    className="sr-only"
                                  >
                                    {" "}
                                    White{" "}
                                  </span>
                                  <span
                                    aria-hidden="true"
                                    className={`h-8 w-8  rounded-full border border-black border-opacity-10`}
                                    style={{
                                      backgroundColor: `${prodId.modelPerColors[0].color.code}`,
                                    }}
                                  ></span>
                                </label>
                              </span>
                            </fieldset>
                          </div>

                          <div className="mt-10">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-gray-900">
                                Size
                              </h4>
                              <a
                                href="#"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Size guide
                              </a>
                            </div>

                            {/* SIZE TALLAS */}
                            <div className="flex flex-row">
                              <fieldset className="mt-4 w-44">
                                <legend className="sr-only">
                                  Choose a size
                                </legend>
                                <div className="grid grid-cols-4 gap-4">
                                  <select className="p-2 border w-40 bg-white">
                                    {parseInt(
                                      prodId.modelPerColors[0].clothingSize.size
                                        .rows[0]
                                    ) > 0 ? (
                                      <option
                                        onClick={() => {
                                          setStock(
                                            prodId.modelPerColors[0]
                                              .clothingSize.size.rows[0]
                                          );
                                          setSize("S");
                                        }}
                                      >
                                        S
                                      </option>
                                    ) : null}
                                    {parseInt(
                                      prodId.modelPerColors[0].clothingSize.size
                                        .rows[1]
                                    ) > 0 ? (
                                      <option
                                        onClick={() => {
                                          setStock(
                                            prodId.modelPerColors[0]
                                              .clothingSize.size.rows[1]
                                          );
                                          setSize("M");
                                        }}
                                      >
                                        M
                                      </option>
                                    ) : null}
                                    {parseInt(
                                      prodId.modelPerColors[0].clothingSize.size
                                        .rows[2]
                                    ) > 0 ? (
                                      <option
                                        onClick={() => {
                                          setStock(
                                            prodId.modelPerColors[0]
                                              .clothingSize.size.rows[2]
                                          );
                                          setSize("L");
                                        }}
                                      >
                                        L
                                      </option>
                                    ) : null}
                                  </select>
                                </div>
                              </fieldset>
                              <div className="mt-4 ">
                                {parseInt(stock) >= 3 ? (
                                  <select className="p-2 border w-40 bg-white">
                                    <option
                                      onClick={() => {
                                        setCantidad(1);
                                      }}
                                    >
                                      1
                                    </option>
                                    <option
                                      onClick={() => {
                                        setCantidad(2);
                                      }}
                                    >
                                      2
                                    </option>
                                    <option
                                      onClick={() => {
                                        setCantidad(3);
                                      }}
                                    >
                                      3
                                    </option>
                                  </select>
                                ) : parseInt(stock) == 2 ? (
                                  <select className="p-2 border w-40 bg-white">
                                    <option
                                      onClick={() => {
                                        setCantidad(1);
                                      }}
                                    >
                                      1
                                    </option>
                                    <option
                                      onClick={() => {
                                        setCantidad(2);
                                      }}
                                    >
                                      2
                                    </option>
                                  </select>
                                ) : parseInt(stock) == 1 ? (
                                  <select className="p-2 border w-40 bg-white">
                                    <option
                                      onClick={() => {
                                        setCantidad(1);
                                      }}
                                    >
                                      1
                                    </option>
                                  </select>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="mt-2">{prodId.description}</div>
                          <button
                            type="submit"
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-black py-3 px-8 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Añadir a la bolsa
                          </button>
                          <a
                            type="submit"
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-black py-3 px-8 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            href={`/carrito/${prodId._id}`}
                            onClick={() => {}}
                          >
                            Comprar
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              setPreCompra({ cantidad: cantidad, size: size });
                            }}
                          >
                            sii
                          </button>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Catalogo;
