import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { data as mockData } from "../../data/mockData";
import { Card, CardTheme } from "components/Card/Card";
import randomTheme from "utils/randomTheme";
import SliderButtons from "components/SliderButtons/SliderButtons";
import dataHandler, { DataItem } from "utils/dataHandler";
import "./Slider.css";

const Slider = () => {
  const [scrollX, setScrollX] = useState(0);
  const [sliderHeight, setSliderHeight] = useState(0);
  const [sliderScale, setSliderScale] = useState(0);
  const scrollBlock = useRef(false);

  const data = useMemo(() => dataHandler(mockData), []);
  const cardSize = Math.floor(344 * sliderScale);

  const maxScroll =
    (document.querySelector(".slider__inner")?.scrollWidth || 0 * sliderScale) -
    (document.querySelector(".slider")?.clientWidth || 0 * sliderScale);

  useEffect(() => {
    // переменная для учета высоты slider при изменении высоты slider__inner (длинный заголовок в карточке)
    setSliderHeight(document.querySelector(".slider__inner")?.scrollHeight || 0);
    setSliderScale((document.querySelector(".slider")?.clientWidth || 1440) / 1440);
    window.addEventListener("resize", handleResize);

    document
      .querySelector("body")
      ?.addEventListener("wheel", preventScroll, { passive: false });

    return () => {
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("resize", handleResize);
    };
  }, [sliderHeight, scrollX]);

  // блок глобального скролла при прокрутке слайдера
  const preventScroll = (e: WheelEvent) => {
    if (scrollBlock.current === true) {
      e.preventDefault();
      e.stopPropagation();
      scrollBlock.current = false;
    }
  };

  const handleResize = () => {
    setSliderScale((document.querySelector(".slider")?.clientWidth || 1440) / 1440);
    setSliderHeight(document.querySelector(".slider__inner")?.scrollHeight || 0);
  };

  // обработка скролла колесом мышки
  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    setScrollX(() => {
      if (scrollX + e.deltaY < -maxScroll) {
        return -maxScroll;
      }
      if (scrollX + e.deltaY > 0) {
        return 0;
      } else {
        scrollBlock.current = true;
        return scrollX + e.deltaY;
      }
    });
  };

  // обработка скролла кнопками
  const buttonScroll = (direction: "left" | "right") => {
    console.log(
      `scrollX: ${scrollX} cardSize: ${cardSize} maxScroll: ${-maxScroll} sliderScale: ${sliderScale}`
    );
    setScrollX(() => {
      if (direction === "right") {
        if (scrollX - (cardSize + (scrollX % cardSize)) < -maxScroll) {
          return -maxScroll;
        }
        console.log(`triggered right ${scrollX - (cardSize + (scrollX % cardSize))}`);
        return scrollX - (cardSize + (scrollX % cardSize));
      } else {
        if (scrollX % cardSize === 0) {
          if (scrollX + cardSize > 0) return 0;
          return scrollX + cardSize;
        } else {
          if (scrollX - (scrollX % cardSize) > 0) return 0;
          return scrollX - (scrollX % cardSize);
        }
      }
    });
  };

  // рендерим галлерею карточек для slider__inner
  const renderCards = useCallback(
    (data: DataItem[]) => {
      let currentTheme = randomTheme();

      return data.map((item, index) => {
        if (currentTheme === CardTheme.CIRCLE && index !== 0) {
          // в randomTheme можно исключить повтор любой темы карточки два раза подряд, передав её как аргумент
          currentTheme = randomTheme(CardTheme.CIRCLE);
        } else currentTheme = randomTheme();

        return (
          <Card
            key={item.id}
            size={item.size}
            imgLink={item.img}
            title={item.title}
            date={item.date}
            theme={currentTheme}
            sliderScale={sliderScale}
          />
        );
      });
    },
    [sliderScale]
  );

  return (
    <>
      <div className="slider" onWheel={handleScroll} style={{ height: `${sliderHeight}px` }}>
        <div className="slider__inner" style={{ left: `${scrollX}px` }}>
          {useMemo(() => renderCards(data), [renderCards, data])}
        </div>
      </div>
      <SliderButtons buttonScroll={buttonScroll} scrollX={scrollX} />
    </>
  );
};

export default Slider;
