import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./App.css";

const X_MIN = 0;
const X_MAX = 190;
function App() {
  const [reverse, setReverse] = useState(false);

  const [springs, api] = useSpring(() => ({
    from: { x: 0, background: "#9e1e1e" },
  }));

  const handleClick = () => {
    api.start({
      from: { x: X_MIN, background: "#9e1e1e" },
      to: { x: X_MAX, background: "#303ebf" },
      config: { precision: 0.0001 },
      reverse,
    });
    setReverse(!reverse);
  };

  return (
    <>
      <animated.div
        onClick={handleClick}
        style={{
          width: 80,
          height: 80,
          borderRadius: 8,
          ...springs,
        }}
      />
      <h1>Daric Teske</h1>
    </>
  );
}

export default App;
