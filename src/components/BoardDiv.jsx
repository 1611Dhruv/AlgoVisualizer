import React, { useEffect, useState } from "react";

const BoardDiv = ({
  Component,
  timeOut,
  transitionStyle,
  afterStyle,
  transition,
}) => {
  const [style, setStyle] = useState({});
  useEffect(() => {
    if (transition) {
      setStyle(transitionStyle);
      setTimeout(() => {
        setStyle(afterStyle);
      }, timeOut);
    } else {
      console.log("worked");
      setStyle({});
    }
  }, [transition]);
  return <Component style={style} />;
};

export default BoardDiv;
