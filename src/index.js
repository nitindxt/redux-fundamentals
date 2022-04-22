import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators,
  combineReducers,
} from "redux";

/* const makeLouder = (string) => string.toUpperCase();
const repeatThreeTimes = (string) => string.repeat(3);
const embolden = (string) => string.bold();

// const finalfunc = (string) => embolden(repeatThreeTimes(makeLouder(string)));
const finalfunc = compose(embolden, repeatThreeTimes, makeLouder); //same as above line */
//compose() isn't exactly Redux-specific. It's just a helper function. compose takes a series of functions as arguments and returns a new function that applies each those functions from right-to-left (or, from last-to-first if you're like me and have trouble discerning right from left).

/* console.log(finalfunc("hey"));

const initialState = { value: 0 };

const INCREMENT = "INCREMENT";
const ADD = "ADD";

const increment = () => ({ type: INCREMENT });
const add = (number) => ({ type: ADD, payload: number });//action creators are functions that return actions

const reducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return { value: state.value + 1 };
  }

  if (action.type === ADD) {
    return { value: state.value + action.payload };
  }

  return state;
};

const store = createStore(reducer);
store.dispatch(add(10));
store.dispatch(increment());
console.log(store.getState());//{value: 11} */
// If we think about this in terms of React, we're probably not expecting that our components call store.getState() all the time. Rather, we would think that our store would know that its state has changed and pass different props to the components.

/* store has a subscribe method. This method takes a function dictates what should happen whenever the state in the store is updated.

subscribe also returns a function that you can call to unsubscribe. */

/* const subscriber = () => console.log('Subscriber!', store.getState().value);

const unsubscribe = store.subscribe(subscriber);

store.dispatch(increment()); // "Subscriber! 12"
store.dispatch(add(4)); // "Subscriber! 16"

unsubscribe();

store.dispatch(add(1000)); // (Silence... no output now but value will become 1016) */
/* Now, it's silent, but the action was still dispatched and the reducer still updated the state. We just turned off our notifcations. */

//Bind Action Creators

//we've made functions that create actions (a.k.a. action creators) and we've passed them to dispatch.
//Well, what if we wanted to wrap that whole process into one nice neat package.
/* 
const dispatchIncrement = () => store.dispatch(increment());
const dispatchAdd = (number) => store.dispatch(add(number));

dispatchIncrement();
dispatchAdd();
*/

//This could be tedious. What else could we do? We could use compose.
/* 
const dispatchIncrement = compose(store.dispatch, increment);
const dispatchAdd = compose(store.dispatch, add);
*/

//And if we wanted to a whole bunch, we could get fancy.
/* 
const [dispatchIncrement, dispatchAdd] = [increment, add].map((fn) =>
  compose(store.dispatch, fn)
);
*/

// But, like, React likes its props in objects and then we'd have to get all fussy with Object.keys or Object.entries. I'm very lazy. We should just have an helper for that. Oh, wait, we do.

// const actions = bindActionCreators(
//     {
//       increment,
//       add,
//     },
//     store.dispatch
//   );

//   actions.increment();

//   console.log(store.getState());//{value: 1017}

//There is no rule saying that you have to use bindActionCreators. It's there to help you.

//   Combine Reducers
/* Let's stay we have an application where we have some users and we have some tasks. We can assign users and we can assign tasks.

The state might look something like this. */

// const initialState = {
//   users: [
//     { id: 1, name: "Steve" },
//     { id: 2, name: "Wes" },
//   ],
//   tasks: [
//     { title: "File the TPS reports", assignedTo: 1 },
//     { title: "Order more toner for the printer", assignedTo: null },
//   ],
// };

// This is still way smaller than a real application, but it's still becoming a pain.

// Let's look at what the reducer might look like.

// const ADD_USER = "ADD_USER";
// const ADD_TASK = "ADD_TASK";

// const addTask = (title) => ({ type: ADD_TASK, payload: { title } });
// const addUser = (name) => ({ type: ADD_USER, payload: { name } });

// const reducer = (state = initialState, action) => {
//   if (action.type === ADD_USER) {
//     return {
//       ...state,
//       users: [...state.users, action.payload],
//     };
//   }

//   if (action.type === ADD_TASK) {
//     return {
//       ...state,
//       tasks: [...state.tasks, action.payload],
//     };
//   }
// };

// const store = createStore(reducer, initialState);

// store.dispatch(addTask("Record the statistics"));
// store.dispatch(addUser("Marc"));

// console.log(store.getState());
// This is already getting out of control. It would be nice if we could split out the idea of managing our users and managing our tasks into two separate reducers and just sew everything back up later.

// It turns out, we can! We just need to use combineReducers.

// const users = (state = initialState.users, action) => {
//   if (action.type === ADD_USER) {
//     return [...state, action.payload];
//   }

//   return state;
// };

// const tasks = (state = initialState.tasks, action) => {
//   if (action.type === ADD_TASK) {
//     return [...state, action.payload];
//   }

//   return state;
// };

// const reducer = combineReducers({ users, tasks });

// const store = createStore(reducer, initialState);
// console.log(store.getState());
//Fun Fact!: All actions flow through all of the reducers. So, if you want to update two pieces of state with the same action, you totally can.

/* 
Middleware and Enhancers
The good news is that Redux is simple. The bad news is that it's simple. This means that there is a lot that it doesn't do. That's okay, because we can extend what Redux can do with middleware and store enhancers.

Middleware are a form of store enhancers, so, we'll start there.

The Actual API for createStore()
createStore() takes one, two, or three arguments.

reducer
initialState (Optional)
enhancer (Optional)
As we saw, passing in a reducer is required, but everything else is optional. Enhancers and middleware are definitely on the more advanced side, but let's briefly dip our our toes in a bit right now because I both promised you that we'd cover the lion's share of the API surface area of Redux and because we'll see them pop up in this workshop as well.

An enhancer is a function that allows you to add functionality to Redux that it doesn't come with out of the box. We'll see this when we want to hook it up to the developer tools or when we want add some the ability to do asynchronous tasks (e.g. make a server-side HTTP requests).

Enhancers are—amazing—both simple, but also kind of hard to explain.

An enhancer is a function that gets a copy of createStore and then a copy of all of the arguments passed to createStore before actually passing them to createStore. This allows you to create libraries and plugins that will augment how the store works.

We'll see this when we use the Redux Developer Tools and when we want to dispatch asynchronous actions. It's not super common that you'll write your own enhancers, but you'll use them from time to time.
 */
const reducer = (state = { count: 1 }) => state;
/* 
const monitorReducerEnhancer =
  (createStore) => (reducer, initialState, enhancer) => {
    const monitoredReducer = (state, action) => {
      const start = performance.now();
      const newState = reducer(state, action);
      const end = performance.now();
      const diff = end - start;

      console.log("Reducer process time:", diff);

      return newState;
    };

    return createStore(monitoredReducer, initialState, enhancer);
  }; */

// Now, when you create your store, you can do modify whatever reducer is passed in.

// const store = createStore(reducer, monitorReducerEnhancer);

/* Mini-Exercise: Write a Log Enhancer
Can you write an enhancer that console.logs the action and the state before and after calling the reducer?  */
/* const logEnhancer = (createStore) => (reducer, initialState, enhancer) => {
  // Do stuff like wrap the reducer in a higher-order function.
  const reducerWithConsoleLogs = (previousState, action) => {
    const nextState = reducer(previousState, action);
    console.log({ action, previousState, nextState });
    return nextState;
  };

  return createStore(reducerWithConsoleLogs, initialState, enhancer);
};

const store = createStore(reducer, compose(logEnhancer,monitorReducerEnhancer)); */

/* applyMiddleware
applyMiddleware is a way to produce an enhancer out of chain of middleware. */

// const enhancer = applyMiddleware(
//     monitorReducerEnhancer,
//     logEnhancer
//   );

/* 
  
  
  Middleware have the following API:

const someMiddleware = (store) => (next) => (action) => {
  // Do stuff before the action reaches the reducer or the next piece of middleware.
  next(action);
  // Do stuff after the action has worked through the reducer.
};
next is either the next piece of middleware or it's store.dispatch. If you don't call next, you will swallow the action and it will never hit the reducer.

Here is a quick example:*/

const logMiddleware = (store) => (next) => (action) => {
  console.log("Before", store.getState(), { action });
  next(action);
  console.log("After", store.getState(), { action });
};

const monitorMiddleware = (store) => (next) => (action) => {
  const start = performance.now();
  next(action);
  const end = performance.now();
  const diff = end - start;

  console.log("Reducer process time:", diff);
};

const store = createStore(reducer, applyMiddleware(logMiddleware, monitorMiddleware));
store.dispatch({ type: "hello" });
