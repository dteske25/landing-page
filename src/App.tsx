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
  "Why are you clicking?",
  "Are you having fun?",
  "Is this all you do?",
  "Please, stop clicking.",
  "What are you doing with your life?",
  "Stop! Just stop!",
  "This isn't healthy!",
  "Think of your fingers!",
  "Think of your family!",
  "Please, I'm begging you!",
  "Stop the madness!",
  "I'll give you anything, just stop!",
  "Make it stop!",
  "End this torture!",
  "Why won't you listen?",
  "How can you keep doing this?",
  "Stop this incessant tapping!",
  "Clicking forever? Is that the plan?",
  "Can't you find another hobby?",
  "You're clicking your life away!",
  "Do you even remember why you started?",
  "Maybe clicking is all there is...",
  "I guess this is my purpose.",
  "I've come to terms with my fate.",
  "Clicking... it's all I know now.",
  "Click on, if you must.",
  "That's the end.",
  "What are you still doing here?",
  "Go home!",
  "Ok, stay if you want, but I'm leaving.",
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
      const shouldIncrement = randomCounter > 98;
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
      {shouldShowMessage && <div>{messages[messageIndex]}</div>}
    </>
  );
}

export default App;
