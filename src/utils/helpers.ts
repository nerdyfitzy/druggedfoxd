import CFalcon from "../../public/static/images/characters/CFalcon.png";
import Doc from "../../public/static/images/characters/Doc.png";
import DonkeyKong from "../../public/static/images/characters/Donkey Kong.png";
import Falco from "../../public/static/images/characters/Falco.png";
import Fox from "../../public/static/images/characters/Fox.png";
import Ganondorf from "../../public/static/images/characters/Ganondorf.png";
import Icies from "../../public/static/images/characters/Icies.png";
import Link from "../../public/static/images/characters/Link.png";
import Luigi from "../../public/static/images/characters/Luigi.png";
import Marth from "../../public/static/images/characters/Marth.png";
import Peach from "../../public/static/images/characters/Peach.png";
import Pikachu from "../../public/static/images/characters/Pikachu.png";
import Puff from "../../public/static/images/characters/Puff.png";
import Samus from "../../public/static/images/characters/Samus.png";
import YL from "../../public/static/images/characters/YL.png";
import Sheik from "../../public/static/images/characters/Sheik.png";
import Bowser from "../../public/static/images/characters/Bowser.png";
import GnW from "../../public/static/images/characters/GnW.png";
import Yoshi from "../../public/static/images/characters/Yoshi.png";
import { NamesToImages } from "@/utils/types";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const namesToImages: NamesToImages = {
  CFalcon,
  Doc,
  Falco,
  Fox,
  Ganondorf,
  Icies,
  Link,
  Luigi,
  Marth,
  Peach,
  Bowser,
  Pikachu,
  Puff,
  Samus,
  YL,
  Sheik,
  GnW,
  Yoshi,
  "Donkey Kong": DonkeyKong,
};

export function formatDate(date: string | Date) {
  const d = new Date(date);
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export function getImageFromName(name: string) {
  return namesToImages[name];
}
