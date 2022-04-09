import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form'
import authReducer from './authReducer';
import streamReducer from './streamReducer'

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer
})

//---------------------------------------------------------------------------------------------------------------
//form: formReducer ---> Here the kay has to be 'form' no mattter what it is not something which user gives.

//--------------------------------------------------------------------------------------------------------------
//ARRAY
//Removing an element from an array
//BAD -> state.pop()    GOOD ->state.filter(element => element !== 'hi')
//My understanding --> Doing any sort of map ror filter or anything over a state which is in the form of an
//array will modify the state as well.

//Adding an element into an array
//BAD ->state.push('hi)  GOOD ->[...state,'hi']

//Replacing an element into an array
//BAD -> state[0] = 'hi'  GOOD -> state.map(element => element ==='hi' ? 'bye' : 'element')


//OBJECT
//Updating a property from an object
//BAD -> state.name = 'sam'  GOOD -> {...state,name:'sam'}
//Why do we do {...state} --> if we do not return a brand new object redux is going to assume that the state
//was not changed and there wont be any update.

//Adding a property to an object
//BAD -> state.age = 30  GOOD -> {...state,age:30}

//Removing a property from an object
//BAD -> delete state.name  GOOD -> {...state, age:undefined} or _omit(state,'age')


//You would typically use an array if you were simply iterating over a list. If you were doing any type of 
//CRUD operation searching / filtering through all of the items in the array to find the specific item becomes 
//a big performance issue

//-------------------------------------------------------------------------------------------------------------------

