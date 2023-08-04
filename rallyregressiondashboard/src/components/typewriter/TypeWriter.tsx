import React, { useState, useEffect, useRef } from "react";

interface Props {
  strings: string[];
}

const Typewriter: React.FC<Props> = ({ strings }) => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentString = strings[currentIndex];
    const currentStringLength = currentString.length;

    if (isTyping) {
      if (text.length < currentStringLength) {
        timerRef.current = setTimeout(() => {
          setText(currentString.slice(0, text.length + 1));
        }, 100);
      } else {
        setIsTyping(false);
        timerRef.current = setTimeout(() => {
          setIsTyping(true);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % strings.length);
          setText(" "); // Reset the text for the next string
        }, 1000); // Wait for 1 second before moving to the next string
      }
    } else {
      if (text.length > 0) {
        timerRef.current = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 50);
      } else {
        setIsTyping(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % strings.length); // Reset currentIndex here
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, text, isTyping, strings]);

  return <div className="typewriter">{text.length === 0 ? "_" : text} </div>;
};

export default Typewriter;
