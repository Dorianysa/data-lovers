import { filterData, filterTypeAncestry } from "../data.js";
import { dataNameToLowerCase } from "../data.js";
import { filterGender } from "../data.js";
import { orderName } from "../data.js";

import data from "../../data/harrypotter/data.js";

//buscar a los personajes por cada letra que esta en el buscador

const houseSelection = document.getElementById("house").value;
const buscadorInput = document.querySelector("#buscador-house");
const seleccionFiltracionSelect = document.getElementById(
  "seleccion-filtracion"
);
const seleccionOrdenarSelect = document.getElementById("seleccion-order");
const contenedorCardsPersonajesDiv = document.getElementById(
  "contenedor-cards-personajes"
);
//Todos los personajes por casa
const personajesHouseSelection = filterData(data, houseSelection);

function buscarPersonajes() {
  buscadorInput.addEventListener("keyup", () => {
    contenedorCardsPersonajesDiv.innerHTML = "";
    const valorBuscador = buscadorInput.value.toLowerCase();

    const personajesEncontrados = personajesHouseSelection.filter(
      (estudianteHouseSelection) => {
        const namePersonajeMinuscula = dataNameToLowerCase(
          estudianteHouseSelection
        );
        return namePersonajeMinuscula.includes(valorBuscador);
      }
    );

    iterarCadaPersonaje(personajesEncontrados);

    console.log(valorBuscador);
    console.log(personajesEncontrados);
  });
}

function filtrarPersonajes() {
  seleccionFiltracionSelect.addEventListener("change", () => {
    contenedorCardsPersonajesDiv.innerHTML = "";
    const valorSeleccion = seleccionFiltracionSelect.value;

    if (valorSeleccion === "Male" || valorSeleccion === "Female") {
      const personajesFiltradosGenero = filterGender(
        personajesHouseSelection,
        valorSeleccion
      );
      iterarCadaPersonaje(personajesFiltradosGenero);
    } else if (
      valorSeleccion === "Muggle" ||
      valorSeleccion === "Pure-blood" ||
      valorSeleccion === "Half-blood"
    ) {
      const personajesFiltradosTipo = filterTypeAncestry(
        personajesHouseSelection,
        valorSeleccion
      );
      iterarCadaPersonaje(personajesFiltradosTipo);
    }
  });
}

function ordenarPersonajes() {
  seleccionOrdenarSelect.addEventListener("change", () => {
    contenedorCardsPersonajesDiv.innerHTML = "";
    const valorSeleccion = seleccionOrdenarSelect.value;
    const personajesNameAscendente = orderName(personajesHouseSelection);

    if (valorSeleccion === "A-Z") {
      iterarCadaPersonaje(personajesNameAscendente);
    } else if (valorSeleccion === "Z-A") {
      const personajesNameDescendente = personajesNameAscendente.reverse();
      iterarCadaPersonaje(personajesNameDescendente);
    }
  });
}

function creacionCard(data) {
  const personajeEncontrado = data;

  const cardPersonajeDiv = document.createElement("div");
  cardPersonajeDiv.classList.add("card-personaje");

  const contenedorImgDiv = document.createElement("div");
  contenedorImgDiv.classList.add("contenedor-img");

  const imagenCasaImg = document.createElement("img");
  imagenCasaImg.classList.add("card-personaje__img");
  imagenCasaImg.setAttribute(
    "src",
    "../../assets/escudo-" + `${houseSelection}` + ".png"
  );

  const contenedorCardInfoDiv = document.createElement("div");
  contenedorCardInfoDiv.classList.add("card-personaje__info");

  const cardInfoTituloH3 = document.createElement("h3");
  cardInfoTituloH3.classList.add("card-personaje__info--titulo");
  cardInfoTituloH3.innerText = personajeEncontrado.name;

  contenedorImgDiv.appendChild(imagenCasaImg);
  contenedorCardInfoDiv.appendChild(cardInfoTituloH3);

  const propiedadInfo = [
    "Birthdate:",
    "Specie:",
    "Gender:",
    "Group Association:",
  ];

  const valorInfo = [
    personajeEncontrado.birth,
    personajeEncontrado.species,
    personajeEncontrado.gender,
    personajeEncontrado.associated_groups[0],
  ];

  const nombreClasePadre = [
    "card-personaje__info--birthdate",
    "card-personaje__info--specie",
    "card-personaje__info--gender",
    "card-personaje__info--group",
  ];

  for (let i = 0; i < nombreClasePadre.length; i++) {
    const contenedorPropiedadDiv = document.createElement("div");
    contenedorPropiedadDiv.classList.add(nombreClasePadre[i]);

    const elementNegritaP = document.createElement("P");
    elementNegritaP.classList.add("info-negrita");
    elementNegritaP.innerText = propiedadInfo[i];

    const elementP = document.createElement("P");
    elementP.innerText = valorInfo[i];

    contenedorPropiedadDiv.appendChild(elementNegritaP);
    contenedorPropiedadDiv.appendChild(elementP);
    contenedorCardInfoDiv.appendChild(contenedorPropiedadDiv);
  }

  cardPersonajeDiv.appendChild(contenedorImgDiv);
  cardPersonajeDiv.appendChild(contenedorCardInfoDiv);

  console.log(cardPersonajeDiv);
  return cardPersonajeDiv;
}

function iterarCadaPersonaje(data) {
  for (const personaje of data) {
    contenedorCardsPersonajesDiv.appendChild(creacionCard(personaje));
  }
}

buscarPersonajes();
filtrarPersonajes();
ordenarPersonajes();
