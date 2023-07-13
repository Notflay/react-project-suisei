import axios from "axios";

const API = axios.create({
  baseURL: "https://back-suisei.vercel.app/",
  responseType: "json",
  timeout: 3000,
});

export const getRopa = (page) => {
  return API.get(`/orderPagination/${page}`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const getRopFilt = (page, body) => {
  return API.post(`/forProduct/${page}`, body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const getTypePrd = () => {
  return API.get("/getTypeProd", {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const getColFilt = (page, body) => {
  return API.post(`/getForColor/${page}`, body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const createUser = (body) => {
  return API.post("/createUser", body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const udpatePassword = (body) => {
  return API.post("/udpatePassword", body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const loginUser = (body) => {
  return API.post("/loginUser", body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const getProduct = (id) => {
  return API.get(`/product/${id}`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const createCart = (id, body) => {
  return API.post(`/createCarrito/${id}`, body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const getUsuario = (id) => {
  return API.get(`/getUsuario/${id}`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const deleteCart = (id, body) => {
  return API.put(`/deletecart/${id}`, body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const contCart = (id) => {
  return API.get(`/countCart/${id}`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const getColors = () => {
  return API.get(`/getTypeColor`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const getModel = () => {
  return API.get(`/getTypeModel`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const getTypeProd = () => {
  return API.get(`/getTypeProd`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const getMoney = () => {
  return API.get(`/getTypeMoney`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const createClothing = (body) => {
  return API.post("/createClothing", body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const pageApi = (body) => {
  return API.post("/pay", body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const createCom = (body) => {
  return API.post("/createCom", body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const newProduct = (body) => {
  return API.post("/newProduct", body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const searchForTitle = (id, body) => {
  return API.post(`/searchForTitle/${id}`, body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const updateEstadoProd = (id, body) => {
  return API.post(`/updEstadoProd/${id}`, body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const reporteMensual = () => {
  return API.get("/reporteVentas", {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};
