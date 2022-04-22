import {
    createStore,
    compose,
    applyMiddleware,
    bindActionCreators
  } from "redux";
  
  const makeLouder = (string) => string.toUpperCase();
  const repeatThreeTimes = (string) => string.repeat(3);
  const embolden = (string) => string.bold();
  
  // const finalfunc = (string) => embolden(repeatThreeTimes(makeLouder(string)));
  const finalfunc = compose(embolden, repeatThreeTimes, makeLouder); //same as above line
  //compose() isn't exactly Redux-specific. It's just a helper function. compose takes a series of functions as arguments and returns a new function that applies each those functions from right-to-left (or, from last-to-first if you're like me and have trouble discerning right from left).
  
  console.log(finalfunc("hey"));
  