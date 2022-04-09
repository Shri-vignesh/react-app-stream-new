import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions/index";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues)
    // console.log("form values", formValues); //this is going to contain the same object sent over intial values
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          // initialValues = {{ title :'Edit me', description:'Edit my description'}} //this is how it should look
          // initialValues={this.props.stream} // we shouldn't be passing the entire object here since we can get back
          //userID and ID as well in the above onsubmit function as formValues props
          // initialValues={{title : this.props.stream.title , description: this.props.stream.description}}
          //the above piece of line of code be rafactores using lodash as below
          initialValues={_.pick(this.props.stream, "title", "description")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //2nd argument in mapStateToProps is the set of props this component receives
  //from his parent or from route

  //here streams is basically an object which contains the ID as keys, so we target that stream ID using the
  //ID seen in the URL
  return { stream: state.streams[ownProps.match.params.id] }; //path in which ID is seen in props
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);

//------------------------------------------------------------------------------------------------------
//Stram Edit basically receives a set of props from react router since route helps in rendering the stream
//edit component
//-------------------------------------------------------------------------------------------------------------
//Lecture 361 and 362 - topic : Selecting records from state (just in case if lecture no changes in future)
//We see a weird issue - When the user is on edit page and when he refreshes the page, the stream data associated
//with that particular id(lets say 3) is not showing up in the state, the reason being the streams state which
//is supposed to carry the list of streams is empty, the reason it is seen empty is we have the fetch call for
//all the streams happening in the main route '/' page and we have the action call written in the component Did
//Mount method since it is written there and we have refreshed then page there is no api call happening to fetch
//the list of streams and so we are not able to see a particular stream associated to the ID appearing in the
// Stream Edit page.

//To avoid this above problem we have a individual action FETCH_STREAM written to fill up the state when we
//refreshes the page.
//---------------------------------------------------------------------------------------------------------------

//IMPPPP -> With react router each component has to be designed to work on isolation ( has to fetch its own data),
//thats you in this component we make use uffetchStream action specific for this component.
//--------------------------------------------------------------------------------------------------------------

//<StreamForm initialValues= {{ title: 'incoming title',descrtption: 'incoming description'}}
//This 'initialValues' is a predefined prop name provided by the redux form.
//Outside set of braces {} ---> we can write a javascript expression
//second set of expression {{}} --> this indicates that we are creating a normal object
//-----------------------------------------------------------------------------------------------------------
//lodash Pick function-> _.pick()

// const profile = {
//   name :'sam',
//   age: '12',
//   favColor: 'orange'
// }

// _.pick(profile,'name') --->O/P {name: 'sam'}
//profile object will still remain the same
//-----------------------------------------------------------------------------------------------------------
