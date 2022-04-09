import _ from 'lodash'
import {
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM,
} from "../actions/types";

export default (state = {},action) => {
  switch(action.type){
    case FETCH_STREAM:
      return {...state,[action.payload.id]: action.payload}
    case CREATE_STREAM:
      return {...state, [action.payload.id]: action.payload}
    case EDIT_STREAM:
      return {...state, [action.payload.id] :action.payload}
    case DELETE_STREAM:
      return _.omit(state,action.payload) //omit will not change the original state object instead it will create a new object
    case FETCH_STREAMS:
      return {...state,..._.mapKeys(action.payload, 'id')} //mapKeys creates a one huge object so we take each key pair inside it and place it inside the
      //the newly created object so we do "..."
      //My doudt here was -> Why should I bother with the ones already in my state when technically I have all the updated ones in my payload object?
    default:
      return state

  }
}

//-----------------------------------------------------------------------------------------------------------

//KEY INTERPOLATION
//In our case for the EDIT_STREAM:

// we know state object looks like

// state = {
//   2: {
//     id: '2',
//     title: "something",
//     description: "something"
//   },
//   3: {
//     id: '3',
//     title: "something",
//     description: "something"
//   },
//   4: {
//     id: '4',
//     title: "something",
//     description: "something"
//   }
// }

// case EDIT_STREAM:
  //  const newState = {...state}
  //  newState[actionTypes.payload.id] = action.payload
  //  return newState

  //The above code can be re written as
  //  return {...state,[action.payload.id] : action.payload};   ----->This way of adding a array structure is called
  //  Key Interpolation. If we know exactly what the key will be then we go in this way for ex {...state, name:'sam'}

//------------------------------------------------------------------------------------------------------------------------------------------------
//How to convert a array of objects into objects with keys --> we need to make use of lodash maoKeys method 
//Scenario is you get a list of array and you need to convert them into an object with key being tha value of a particular key in a object.

//Example

// const colors = [
//   {hue : 'green'},
//   {hue : 'yellow'},
//   {hue : 'orange'}
// ]

// _.mapKeys(colors,'hue') ///make sure you give the hue within paranthesis

// console.log OUTPUT

// {
//   "green":{"hue":"green"},
//   "yellow":{"hue":"yellow"},
//   "orange":{"hue":"orange"}
// }

//-----------------------------------------------------------------------------------------------------------------------------------------------
//In case if you dont want to use lodash for fetch streams..

// case GET_STREAMS:
//     const newObject = {};
//     action.payload.forEach( (item) => newObject[item.id] = item );
//     return { ...state, ...newObject};

//OR

//const newObject = action.payload.reduce((map, item) => ({ ...map, [item.id]: item }), {});

//ARRAY concepts to be masterd
//1. map
//2. reduce
//3. for each
//4. filter

//---------------------------------------------------------------------------------------------------------------------------------------------