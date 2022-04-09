import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "526584503335-1rkgor9030jafhjov23v04f3m0padfgj.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange); //making a call back function once the listen is complete
        });
    });
  }

  //Imp -> these call back methods should alwasys be a arrow function, I think the reason to get these functions get attached
  //to the class
  // onAuthChange = () => {
  //   this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  // };

  // we have wired this function to the google api lib with the listen call, this func get called with the boolean arg
  //with the status of the user
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  //Even this mehtod is a call back method because my guess is this method gets called only after the user click,
  //I think the call back methods shold always called without the paranthesis()
  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In with google
        </button>
      );
    }
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

//------------------------------------------------------------------------------------------------------------------

//5. FIrst we need to load the client portion of the library so we do
//window.gapi.load('client:auth2') ---> load client auth 2 into gapi,
//if we do so it will take some tiem for the library to reach the ggole servers and
//download some JS code sp we need to get a call when that process is complete so we do
// the intialization -> wondow.gapi.load('client:auth2',() => {
//window.gapi.init({clientID : '',
//scope: 'email'})  scope is for to say what portion of the user data we need to access through
//})

// Till the above step we haven;t gone through the O Auth process we have just initialized
//the lib

//-------------------------------------------------------------------------------------------------------------------
//STEP 2
//1. Get reference to the auth object after the initialization. When we call gapi.auth2.getAuthInstance() -> we get
//reference to the auth object.

//Why do we need this object -> because this object contains methods such as signedIn and signout.and moreover this
//object is availble only after the initialize process so we have to wait for that process to complete and so we are
//are writing the code of auth object creation inside the .then() method and not writing it after the init() process as
// a separete code line.

//---------------------------------------------------------------------------------------------------------------------

//Why did we use a call back function for load and .then() for inti process?
//When we did a load call, once the load call is done it does not return anything it just gices you a signal so we did a
// a call back function but in the case if init() it happens asynchronously and it does return you a promise object so we
//go for .then() method eventhough we are not making use of hte object that is being returned.

//In both the cases we are waiting for the process to get complete.

//--------------------------------------------------------------------------------------------------------------------

//Here, my understanding is that the componentDidMount() gets called only one time when the component first gets
// rendered to the screen. But how is the this.auth.isSignedIn.listen(this.onAuthChange) inside componentDidMount()
// getting called everytime a user's authentication status changes?

//Bobby ans --> componentDidMount only ever runs once, when the component first is mounted to the DOM. If a listener
//method is called, it will continue listening for events (remember back to an error exercise where we made use of the
// setInterval method)

//---------------------------------------------------------------------------------------------------------------------
