import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/",
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
