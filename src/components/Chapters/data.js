import chapterOne from "./chapterOne";
import chapterTwo from "./chapterTwo";
import chapterThree from "./chapterThree";
import chapterFour from "./chapterFour";
import chapterFive from "./chapterFive";
import chapterSix from "./chapterSix";
import chapterSeven from "./chapterSeven";
import chapterEight from "./chapterEight";
import chapterNine from "./chapterNine";
import chapterTen from "./chapterTen";
import chapterEleven from "./chapterEleven";
import chapterTwelve from "./chapterTwelve";
import chapterThirteen from "./chapterThirteen";
import chapterFourteen from "./chapterFourteen";
import chapterFifteen from "./chapterFifteen";
import chapterSixteen from "./chapterSixteen";

const chapters = {
  "Chapter 1": chapterOne,
  "Chapter 2": chapterTwo,
  "Chapter 3": chapterThree,
  "Chapter 4": chapterFour,
  "Chapter 5": chapterFive,
  "Chapter 6": chapterSix,
  "Chapter 7": chapterSeven,
  "Chapter 8": chapterEight,
  "Chapter 9": chapterNine,
  "Chapter 10": chapterTen,
  "Chapter 11": chapterEleven,
  "Chapter 12": chapterTwelve,
  "Chapter 13": chapterThirteen,
  "Chapter 14": chapterFourteen,
  "Chapter 15": chapterFifteen,
  "Chapter 16": chapterSixteen,
};

const chapterNames = Object.keys(chapters);

export { chapters, chapterNames };
