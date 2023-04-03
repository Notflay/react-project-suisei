import axios from "axios";
import { createContext, React, useContext, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Content from "./components/Content";
import Carrito from "./components/content/Carrito";

import Login from "./components/content/Login";
import Pruebah from "./components/content/Pruebah";
import Registrar from "./components/content/Registrar";
import Footer from "./components/partials/Footer";
import Header from "./components/partials/Header";
import { contCart, getRopa } from "./services/axios.service";

export const AppContext = createContext(null);

function App() {
  const [toggle, setToggle] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [bottons, setBottons] = useState(1);
  const [filt, setFilt] = useState(null);
  const [filtcol, setFiltcol] = useState([]);
  const [order, setOrder] = useState(null);
  const [preCompra, setPreCompra] = useState(null);
  const [log, setLog] = useState(false);
  const [preVentas, setPreVentas] = useState(0);

  useEffect(() => {
    setBottons(Math.ceil(total / 9));
  }, [products]);

  async function changeItem() {
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
    <AppContext.Provider
      value={{
        filt,
        filtcol,
        setFiltcol,
        order,
        setFilt,
        setOrder,
        toggle,
        setToggle,
        products,
        setProducts,
        setTotal,
        total,
        bottons,
        preCompra,
        setPreCompra,
        log,
        setLog,
        preVentas,
        changeItem,
      }}
    >
      <Router>
        <Header changeItem={changeItem} />
        <main>
          <Routes>
            <Route index element={<Content />} />
          </Routes>
          <Routes>
            <Route path="/registro" element={<Registrar />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<Login changeItem={changeItem} />} />
          </Routes>
          <Routes>
            <Route path="/prueba" element={<Pruebah />} />
          </Routes>
          <Routes>
            <Route path="/carrito/:id" element={<Carrito />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
