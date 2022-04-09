import React from "react";
import ReactDOM from "react-dom";
import history from "../history"

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div
      onClick={() => history.push("/")}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={props.onDismiss}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">
          {props.content}
        </div>
        <div className="actions">
          {props.actions}
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;

//----------------------------------------------------------------------------------------------------------------
//create portal will take in two arguments, one is the JSX and other one is where to show this JSX.
//We need to make surer ths JSX we give inside the create Portal is rendered directly on the body element, if we do
//directly to the body then this portal is going to replace all the existing content inside the body, so instead we
//are going to target some newly created div inside the index.html file so we create a new div inside index.html file.
//-------------------------------------------------------------------------------------------------------------------
//<div onClick={() => history.push("/")} --> Whenever th user clicks outside the Modal window can make the modal window
//to close and route to the main stream page.

// There is an issue ---> Whenever the user clicks inside the modal window the modal window closes and routes to the
//main stream page why that happens?, this is due to event bubbling/event propagttion, whenever we trigger an event on 
//any child element that child element if it does not support event handling in it that event is eventualy bubblle up to some
//parent element up the hierarchy untill it gets caught up with some event handler, so just to stop this happening we go
//for "onClick={(e) => e.stopPropagation()}" 

//-----------------------------------------------------------------------------------------------------------------
