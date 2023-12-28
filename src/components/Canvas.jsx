// Canvas.js

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/solid";
const Canvas = () => {
  const [squares, setSquares] = useState([]);
  const canvasRef = useRef(null);

  const handleDrag = (e, info) => {
    // You can implement your logic to update content on drag here
    // For simplicity, let's just log the drag position
    console.log("Drag position:", info.point);
  };

  const handleZoom = (e, info) => {
    // You can implement your logic to update content on zoom here
    // For simplicity, let's just log the zoom scale
    console.log("Zoom scale:", info.scale);
  };

  const addSquare = () => {
    const newSquare = {
      id: squares.length + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
    };

    setSquares((prevSquares) => [...prevSquares, newSquare]);
  };

  return (
    <div>
      <button
        onClick={addSquare}
        style={{
          background: "#001F3F", // Navy Blue background color
          color: "#FFFFFF", // White text color
          padding: "10px",
          borderRadius: "5px",
          position: "absolute",
          left: "50%",
          marginTop: "20px",
          translateX: "-50%",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
        className=" hover:bg-slate-800"
      >
        Add
      </button>
      <motion.div
        className="canvas"
        ref={canvasRef}
        style={{
          borderRadius: "15px",
          width: "80vw",
          height: "80vh",
          background: "#001d3d",
          overflow: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        onDrag={handleDrag}
        onPinch={handleZoom}
      >
        <AnimatePresence>
          <motion.div
            className="content"
            style={{
              width: "100%",
              height: "100%",
              background: "transparent",
              position: "relative",
              scale: 1,
            }}
            initial={{
              top: "50%",
              left: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            {/* Your dynamic content goes here */}
            {/* For example, render a list of draggable circular squares */}
            {squares.map((square) => (
              <motion.div
                key={square.id}
                className="draggable-square"
                drag
                dragConstraints={canvasRef}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.125 }}
                dragMomentum={false}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background: "#ffd60a",
                  margin: "20px",
                  position: "absolute",
                  top: `${square.top}%`,
                  left: `${square.left}%`,
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Canvas;
