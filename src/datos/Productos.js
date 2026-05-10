import Carmesi from "../imagenes/Carmesi.jpeg";
import Pocahontas1 from "../imagenes/Pocahontas1.jpeg";
import Pocahontas2 from "../imagenes/Pocahontas2.jpeg";
import Pocahontas3 from "../imagenes/Pocahontas3.jpeg";
import Pocahontas4 from "../imagenes/Pocahontas4.jpeg";
import PaloRosa1 from "../imagenes/PaloRosa1.jpeg";
import PaloRosa2 from "../imagenes/PaloRosa2.jpeg";
import PaloRosa3 from "../imagenes/PaloRosa3.jpeg";
import PaloRosa4 from "../imagenes/PaloRosa4.jpeg";
import PaloRosa5 from "../imagenes/PaloRosa5.jpeg";
import Gris1 from "../imagenes/Gris1.jpeg";
import Gris2 from "../imagenes/Gris2.jpeg";
import Barbie1 from "../imagenes/Barbie1.jpeg";
import Barbie2 from "../imagenes/Barbie2.jpeg";

const products = [
  {
    id: 1,
    name: "Conjunto Carmesí",
    color: "Rojo carmesí",
    talla: ["S","M","L"],
    price: 20,
    images: [Carmesi]
  },
  {
    id: 2,
    name: "Conjunto Pocahontas",
    color: "Cafe claro",
    talla: ["S","M","L"],
    price: 20,
    images: [Pocahontas1, Pocahontas2, Pocahontas3, Pocahontas4]
  },
  {
    id: 3,
    name: "Conjunto Palo Rosa",
    color: "Palo rosa",
    talla: ["S","M","L"],
    price: 20,
    images: [PaloRosa1, PaloRosa2, PaloRosa3, PaloRosa4, PaloRosa5]
  },
  {
    id: 4,
    name: "Conjunto Gris",
    color: "Gris",
    talla: ["S","M","L"],
    price: 20,
    images: [Gris1, Gris2]
  },
  {
    id: 5,
    name: "Conjunto Barbie",
    color: "Rosa",
    talla: ["S","M","L"],
    price: 20,
    images: [Barbie1, Barbie2]
  }
];

export default products;