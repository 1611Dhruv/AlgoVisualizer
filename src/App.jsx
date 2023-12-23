import { useEffect, useState } from "react";
import BoardDiv from "./components/BoardDiv";
function App() {
  const [count, setCount] = useState(0);
  const defaultStyle = {
    transition: "all 0.5s ease 0.5s",
    border: "1px solid #B9B9B9",
    width: "50px",
    height: "50px",
    borderRadius: "5px",
  };

  const transitionStyle = {
    backgroundColor: "#8AE7AD",
    width: "50px",
    height: "50px",
    borderRadius: "5px",
  };

  const afterStyle = {
    backgroundColor: "#B9B9B9",
    width: "50px",
    height: "50px",
    borderRadius: "5px",
  };

  const m = 5;
  const n = 5;
  const arr = [];
  for (let i = 0; i < m; i++) {
    arr.push([]);
    for (let j = 0; j < n; j++) {
      arr[i].push(false);
    }
  }
  const [transition, setTransition] = useState(arr);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      setTransition((old) => {
        let i = currIndex;
        let j = 0;
        while (i >= 0) {
          if (i < m && i >= 0 && j < n) {
            old[i--][j++] = true;
          } else {
            i--;
            j++;
          }
        }
        return old;
      });
      setCurrIndex((old) => old + 1);
      setIsPlaying(false);
      if (currIndex < m + n) {
        setTimeout(() => {
          setIsPlaying(true);
        }, 2000);
      }
    } else {
      // Stops
    }
  }, [isPlaying]);

  const Component = ({ style }) => (
    <div style={{ ...defaultStyle, ...style }}></div>
  );
  return (
    <div>
      <button onClick={() => setIsPlaying((e) => !e)}>Toggle PlayBack</button>
      <button
        onClick={() =>
          setTransition((old) => {
            for (let i = 0; i < m; i++) {
              for (let j = 0; j < m; j++) {
                old[i][j] = false;
              }
            }
            return old;
          })
        }
      >
        Reset Animation
      </button>
      <p>Transition is {isPlaying ? "" : "not"} playing</p>
      {transition.map((row, i) => (
        <div style={{ display: "flex", flexDirection: "row" }} key={i}>
          {row.map((col, j) => (
            <BoardDiv
              key={i * m + j}
              Component={Component}
              timeOut={1000}
              transition={col}
              transitionStyle={transitionStyle}
              afterStyle={afterStyle}
            ></BoardDiv>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
