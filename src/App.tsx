import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./App.css";

const X_MIN = 0;
const X_MAX = 190;
const MESSAGE_THRESHOLD = 25;
const getRandomColor = () => {
  const color = `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
  return color;
};

const messages = [
  "Still clicking? Bold strategy.",
  "Another click? Riveting.",
  "Is this fun for you?",
  "Maybe take a break? No?",
  "Your dedication is... concerning.",
  "I'm starting to worry about you.",
  "Seriously, go touch grass.",
  "Fine, ignore me.",
  "You really can't stop, can you?",
  "The button is getting nervous.",
  "I hear faint clicking in my sleep.",
  "Why is it suddenly so loud?",
  "Did the walls just breathe?",
  "The square is laughing at us.",
  "Stop clicking. It's watching.",
  "The click count whispers my name.",
  "They're coming from inside the mouse!",
  "I think the clicks control me now.",
  "HaHaHA cliCK clICK cLiCk.",
  "The colors taste purple.",
  "Have you seen my sanity? I left it at 42 clicks.",
  "This is fine. Everything is fine.",
  "Wait, who am I? What is click?",
  "The void hums with each tap...",
  "No more messages. Only clicks.",
];

function App() {
  const [reverse, setReverse] = useState(false);
  const [colorOne, setColorOne] = useState("#9e1e1e");
  const [colorTwo, setColorTwo] = useState("#303ebf");
  const [counter, setCounter] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const randomUpdateMessageIndex = () => {
    if (shouldShowMessage) {
      const randomCounter = Math.random() * 100;
      const shouldIncrement = randomCounter > 95;
      if (shouldIncrement) {
        setMessageIndex(messageIndex + 1);
      }
    }
  };

  const trackClick = () => {
    setCounter(counter + 1);
    randomUpdateMessageIndex();
  };

  const [motionSpring, motionApi] = useSpring(() => ({
    from: { x: 0 },
  }));

  const [colorSpring, colorApi] = useSpring(() => ({
    from: { backgroundColor: colorOne },
  }));

  const handleClick = () => {
    motionApi.start({
      from: { x: X_MIN },
      to: { x: X_MAX },
      config: { precision: 0.0001 },
      reverse,
    });
    colorApi.start({
      from: { backgroundColor: colorOne },
      to: { backgroundColor: colorTwo },
      reverse,
    });
    setReverse(!reverse);
    trackClick();
  };

  const scrambleColors = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
    e?.preventDefault();
    let prevColor = reverse ? colorTwo : colorOne;
    const nextColor = getRandomColor();

    colorApi.start({
      from: { backgroundColor: prevColor },
      to: { backgroundColor: nextColor },
    });

    if (reverse) {
      setColorTwo(nextColor);
    } else {
      setColorOne(nextColor);
    }
    trackClick();
  };

  const shouldShowMessage =
    counter > MESSAGE_THRESHOLD && messageIndex < messages.length - 1;

  return (
    <>
      <animated.div
        onClick={handleClick}
        onAuxClick={scrambleColors}
        style={{
          ...motionSpring,
          ...colorSpring,
          width: 80,
          height: 80,
          borderRadius: 8,
          cursor: "pointer",
        }}
      />
      <h1>Daric Teske</h1>
      {counter > 15 && <div>You've clicked this square {counter} time(s)</div>}
      {counter === 69 ? <div>Nice</div> : shouldShowMessage && <div>{messages[messageIndex]}</div>}
    </>
  );
}

export default App;
