import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./App.css";

const X_MIN = 0;
const X_MAX = 190;
function App() {
  const [reverse, setReverse] = useState(false);

  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }));

  const handleClick = () => {
    api.start({
      from: { x: X_MIN },
      to: { x: X_MAX },
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
          background: "#ff6d6d",
          borderRadius: 8,
          ...springs,
        }}
      />
      <h1>Daric Teske</h1>
    </>
  );
}

export default App;
