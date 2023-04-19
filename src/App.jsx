import axios from "axios";
import {
  createContext,
  React,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Content from "./components/Content";
import Carrito from "./components/content/Carrito";

import Login from "./components/content/Login";
import ActualizarClave from "./components/content/ActualizarClave";
import Pruebah from "./components/content/Pruebah";
import CrearUsuario from "./components/content/CrearUsuario";
import Footer from "./components/partials/Footer";
import Header from "./components/partials/Header";
import {
  contCart,
  getRopa,
  getRopFilt,
  getColFilt,
  searchForTitle,
  getProduct,
  getUsuario,
} from "./services/axios.service";
import FormProducto from "./components/content/FormProducto";
import Hola from "./components/content/Hola";

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
  const [filtName, setFiltName] = useState(null);

  const [produc, setProduc] = useState([]);
  const [totalPre, setTotalPre] = useState(0);
  const [rol, setRol] = useState(null);

  const carrito = useRef(null);

  useEffect(() => {
    setBottons(Math.ceil(total / 9));
  }, [products]);

  async function changeItem() {
    if (localStorage.getItem("login")) {
      await contCart(localStorage.getItem("login")).then((response) => {
        setPreVentas(response.data.cantidad);
      });
      setLog(true);
      if (localStorage.getItem("login") === "641800d34054ef3f304fc053") {
        setRol("admin");
      } else setRol("cliente");
    } else {
      setPreVentas(0);
      setLog(false);
    }
  }

  async function getUser() {
    let i = [];
    const response = await getUsuario(localStorage.getItem("login"));
    let price = 0;

    await Promise.all(
      response.data.carrito.map(async (data) =>
        getProduct(data._id)
          .then((response) => {
            i.push({
              product: response.data,
              talla: data.talla,
              cantidad: data.cantidad,
            });
          })
          .catch((error) => {
            console.log(error);
          })
      )
    );
    setTotalPre(
      i.reduce(
        (accumulator, data) =>
          accumulator +
          data.product.modelMoneyValueId.costPrice * data.cantidad,
        0
      )
    );

    setProduc(i);
  }

  function getValidationsUser() {
    const item = localStorage.getItem("login");
    return item;
  }

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

  async function getRops(
    page = 1,
    dif = filt,
    col = filtcol,
    ord = order,
    name = filtName
  ) {
    let promises = [];
    let prods = null;

    if (dif === null && col.length === 0 && name === null) {
      promises.push(getRopa(page));
    } else if (dif !== null && col.length === 0 && name === null) {
      const prod = {
        product: dif.id,
      };
      promises.push(getRopFilt(page, prod));
    } else if (dif === null && col.length === 0 && name !== null) {
      promises.push(searchForTitle(page, { name: name }));
    } else if (dif === null && col.length !== 0 && name === null) {
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
        setFiltName(name);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRops();
  }, [filt, filtcol, filtName]);

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
        getValidationsUser,
        filtName,
        setFiltName,
        getRops,
        getUser,
        produc,
        totalPre,
        carrito,
        rol,
      }}
    >
      <Router>
        <Header
          changeItem={changeItem}
          getValidationsUser={getValidationsUser}
        />
        <main>
          <Routes>
            <Route index element={<Content carrito={carrito} />} />
          </Routes>
          <Routes>
            <Route path="/registro" element={<CrearUsuario />} />
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
          <Routes>
            <Route path="/updatePass" element={<ActualizarClave />} />
          </Routes>

          <Routes>
            <Route path="/createprod" element={<FormProducto />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
