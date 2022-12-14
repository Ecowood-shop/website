import React from "react";

export const Animation = (ids, direction, func) => {
  const elements = ids.map((id) => document.getElementById(id));
  elements.forEach((element) => {
    element.classList.value.split(" ").filter((el) => {
      if (el.includes("w3-animate-")) {
        element.classList.remove(el);
      }
    });
    setTimeout(() => {
      element.classList.add(`w3-animate-${direction}`);
      func();
    }, 0);
  });
};

export const Opener = (elementArray,state, setState) => {

  const elements = elementArray ? elementArray.map((element)=> document.getElementById(element)): [];


  if (state) {
    elements.forEach((element) => {
      element.classList.remove("w3-animate-right");
      element.classList.add("animate__fadeOutRight");
    });
    setTimeout(() => {
      elements.forEach((element) => {
        element.classList.remove("animate__fadeOutRight");
        element.classList.add("w3-animate-right");
      });
      setState(!state);
    }, 1000);
  } else {
    setState(!state);
  }
};
