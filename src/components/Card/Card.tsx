import React, { memo } from "react";
import "./Card.css";

export enum CardTheme {
  CIRCLE = "card__img--circle",
  LEAF1 = "card__img--leaf-1",
  LEAF2 = "card__img--leaf-2",
  LEAF3 = "card__img--leaf-3",
}

export interface CardProps {
  size?: string;
  imgLink?: string;
  title?: string;
  date?: string;
  theme?: CardTheme;
  titleColor?: string;
  sliderScale?: number;
}

export const Card = memo((props: CardProps) => {
  const { size = "small", imgLink, title, date, theme, sliderScale = 1 } = props;
  const cardSize = sliderScale * (size === "small" ? 344 : 688);

  return (
    <div className={`card`} style={{ width: cardSize }}>
      <img
        className={`card__img ${theme} ${size}`}
        src={imgLink}
        alt="data-card"
        style={{ height: 344 * sliderScale }}
      />

      <h1 className="card__title">{title}</h1>
      <p className="card__date">{date}</p>
    </div>
  );
});
