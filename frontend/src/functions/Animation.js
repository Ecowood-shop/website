import React from 'react'

export const Animation=(ids,direction,func) => {
    const elements=ids.map(id =>document.getElementById(id))
    elements.forEach(element => {
        element.classList.value.split(' ').filter( (el) =>{ if(el.includes("w3-animate-")){element.classList.remove(el)}});
        setTimeout(() => {
            element.classList.add(`w3-animate-${direction}`);
            func();
          
        }, 0);
    });
    
}
