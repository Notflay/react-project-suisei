import axios from "axios";
import { createContext, React, useContext, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Content from "./components/Content";
import Footer from "./components/partials/Footer";
import Header from "./components/partials/Header";
import { getRopa } from "./services/axios.service";

export const AppContext = createContext(null);

function App() {
  const [toggle, setToggle] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [bottons, setBottons] = useState(1);
  const [filt, setFilt] = useState(null);
  const [filtcol, setFiltcol] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setBottons(Math.ceil(total / 9));
  }, [products]);

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
      }}
    >
      <Router>
        <Header />
        <main>
          <Routes>
            <Route index element={<Content />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
