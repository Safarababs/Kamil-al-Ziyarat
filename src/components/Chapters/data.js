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
  "رسول خدا، امیر المومنین، امام حسن اور امام حسین کی زیارتوں کا ثواب":
    chapterOne,
  "زیارت رسول خدا کا ثواب": chapterTwo,
  "زیارت رسول خدا اور وہاں کی دعائیں": chapterThree,
  "مسجد النبی میں نماز پڑھنے کی فضیلت": chapterFour,
  "حضرت حمزہ اور دیگر شہداء کی زیارت": chapterFive,
  "مدینہ کے مشاہدہ مشرفہ کی فضیلت اور ان کی زیارتوں کا ثواب": chapterSix,
  "قبر رسول خدا سے وداع": chapterSeven,
  "مسجد کوفہ اور مسجد سہلہ میں نماز پڑھنے کی فضیلت اور اس کا ثواب":
    chapterEight,
  "قبر امیر المومنین": chapterNine,
  "امیر المومنین کی زیارت کا ثواب": chapterTen,
  "زیارت امیر المومنین، اس کا طریقہ اور وہاں کی دعا": chapterEleven,
  "ذکر وداع قبر امیر المومنین": chapterTwelve,
  "آب فرات کے پینے اور اس سے غسل کرنے کی فضیلت": chapterThirteen,
  "امام حسن اور امام حسین سے رسول خدا کی محبت": chapterFourteen,
  "Chapter 15": chapterFifteen,
  "Chapter 16": chapterSixteen,
};

const chapterNames = Object.keys(chapters);

export { chapters, chapterNames };
