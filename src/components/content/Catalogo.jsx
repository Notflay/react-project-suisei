import React from "react";
import { motion } from "framer-motion";

const Catalogo = ({ products }) => {
  return (
    <div className="p-10 bg-white my-2">
      <div className="grid grid-flow-row-dense grid-cols-3 max-[700px]:grid-cols-1 gap-3">
        {products.map((data, key) => (
          <motion.div
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer border"
            key={key}
          >
            <img src={data.modelPerColors[0].urlImage} />

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
    </div>
  );
};

export default Catalogo;
