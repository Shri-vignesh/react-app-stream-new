import history from '../history'
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";
import streams from "../apis/streams";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

// export const createStream = (formValues) => {
//   return (dispatch) => {
//     streams.post('/streams', formValues)
//   }
// }

// the above code can be refactored as below

export const createStream = (formaValues) => async (dispatch,getState) => { //getState is a function that returns all the states when called
  const {userId} = getState().auth //we need to pass the user Id available from the auth state to identify the streams created by that user
  const response = await streams.post("/streams", {...formaValues,userId});
  dispatch({
    type: CREATE_STREAM,
    payload: response.data,
  });
  history.push('/')
};

export const fetchStreams  = () => async(dispatch) => {
  const response = await streams.get("/streams");

  dispatch({
    type: FETCH_STREAMS,
    payload: response.data
  })
}

export const fetchStream = (id) => async(dispatch) => {
  const response = await streams.get(`/streams/${id}`)

  dispatch({
    type: FETCH_STREAM,
    payload: response.data
  })
}

export const editStream = (id, formValues) => async(dispatch) => {
  // const response = await streams.put(`/streams/${id}`, formValues)
  const response = await streams.patch(`/streams/${id}`, formValues)

  dispatch({
    type: EDIT_STREAM,
    payload: response.data
  })
  history.push('/')
}

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`)

  dispatch({
    type: DELETE_STREAM,
    payload: id //the reason we dispatch id here is becoz this id can be used to idenetify which object to be deleted from the exisitng state in reducer
  })
  history.push('/')
}

//---------------------------------------------------------------------------------------------------------
//PUT ---> Updates all the properties of a record (removes all the existing property with new property sent)
//PATCH ----> Updates only some properties ( leaves the ones that are not being sent to update)

//In our case the user id is sent in durig the form creation and during the form edit time, we send only title
//and description in the payload. We need only the title nad description to be changed for that particular id
//leaving the user id as it is so we go for PATCH instead of PUT for editstream