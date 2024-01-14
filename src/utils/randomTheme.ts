import { CardTheme } from "components/Card/Card";

function randomTheme(exclude?: CardTheme): CardTheme {
  const themesList = Object.values(CardTheme).filter((item) => item !== exclude);
  const numberOfThemes = themesList.length;
  const randomTheme = themesList[Math.floor(Math.random() * numberOfThemes)];

  return randomTheme;
}

export default randomTheme;
