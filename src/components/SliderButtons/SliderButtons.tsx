import React from "react";
import "./SliderButtons.css";

export interface SliderButtonProps {
  buttonScroll: (string: "left" | "right") => void;
  scrollX: number;
}

const SliderButtons = (props: SliderButtonProps) => {
  const { buttonScroll } = props;
  return (
    <div className="buttons">
      <button className="button__left" onClick={() => buttonScroll("left")}></button>
      <button className="button__right" onClick={() => buttonScroll("right")}></button>
    </div>
  );
};

export default SliderButtons;
