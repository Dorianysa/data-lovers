import { computeStats, filterData, filterGender } from "../src/js/data.js";

const characters = [
  { name: "Juan", gender: "Male", house: "Gryffindor", ancestry: "Pure-blood" },
  { name: "Carla", gender: "Female", house: "Ravenclaw", ancestry: "Muggle" },
  {
    name: "Rodrigo",
    gender: "Male",
    house: "Gryffindor",
    ancestry: "Pure-blood",
  },
  { name: "Maria", gender: "Female", house: "Ravenclaw", ancestry: "Muggle" },
];

const charactersGryffindor = [
  { name: "Juan", gender: "Male", house: "Gryffindor", ancestry: "Pure-blood" },
  {
    name: "Rodrigo",
    gender: "Male",
    house: "Gryffindor",
    ancestry: "Pure-blood",
  },
];

const charactersMale = [
  { name: "Juan", gender: "Male", house: "Gryffindor", ancestry: "Pure-blood" },
  {
    name: "Rodrigo",
    gender: "Male",
    house: "Gryffindor",
    ancestry: "Pure-blood",
  },
];

describe("test function for computeStats", () => {
  it("counts characters for each house", () => {
    expect(computeStats({ characters })).toEqual({
      hufflepuff: 0,
      gryffindor: 2,
      ravenclaw: 2,
      slytherin: 0,
    });
  });
});

describe("test function gender", () => {
  it("Filter male", () => {
    expect(filterGender(characters, "Male")).toEqual(charactersMale);
  });
});

describe("test function for character of each house", () => {
  it("function for characters of gryffindor", () => {
    expect(filterData({ characters }, "Gryffindor")).toEqual(
      charactersGryffindor
    );
  });
});

//   it("returns `anotherExample`", () => {
//     expect(anotherExample()).toBe("OMG");
//   });
// });
