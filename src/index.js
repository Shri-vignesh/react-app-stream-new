import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore,applyMiddleware,compose } from "redux";
import reduxThunk from 'redux-thunk'

import App from "./Components/App";
import reducers from "./reducers";

const composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhansers(applyMiddleware(reduxThunk))
  );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

//-------------------------------------------------------------------------------------------------------
//Why do we need to install "react-router-dom" instead of "react-router" alone?

//react-router -> core library for navigation, we do not need to install this manually
//react-router-dom -> It is a library used for dom based naviagtion ( we need this!)
//react-router-native -> It is a library used for navigation for react-native apps
