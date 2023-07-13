import React from "react";
import { FaSearch } from "react-icons/fa";

const Buscador = ({ getRops, valueSearch }) => {
  return (
    <div>
      <div
        className="w-full absolute lg:w-auto left-1"
        style={{
          height: "50px",
          borderRadius: "150px",

          width: "650px",
          marginLeft: "1150px",
        }}
      >
        <input
          style={{
            background: "transparent",
            marginLeft: "25px",
            marginTop: "10px",
            fontSize: "18px",
            fontWeight: "400",
            width: "90%",
            outline: "none",
            color: "#333",
            position: "absolute",
            letterSpacing: ".2px",
            textAlign: "left",
          }}
          ref={valueSearch}
          placeholder="Buscar en Suisei.com"
          onKeyDown={(e) => {
            e.key == "Enter" &&
              valueSearch.current.value.length > 1 &&
              getRops(1, null, [], null, valueSearch.current.value);
          }}
        ></input>
        <div
          style={{
            marginLeft: "100%",
            marginTop: "",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            if (valueSearch.current.value.length > 1) {
              console.log(valueSearch.current.value);
              getRops(1, null, [], null, valueSearch.current.value);
            }
          }}
        >
          <div
            style={{
              position: "absolute",
              marginLeft: "-40px",
              marginTop: "-5px",
              width: "50px",
              height: "50px",
              backgroundColor: "#f64242",
              borderRadius: "100%",
            }}
          >
            <FaSearch
              style={{
                fontSize: "25px",
                textAlign: "center",
                marginLeft: "10px",
                marginTop: "12px",
              }}
            ></FaSearch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buscador;
