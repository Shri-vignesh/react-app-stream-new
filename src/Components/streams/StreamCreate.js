import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions/index";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, {
  createStream,
})(StreamCreate);

//-------------------------------------------------------------------------------------------------------------------------------
//In the import statement 'Field' is in uppercase beacoz its a component and 'reduxForm' is in lowercase becoz it
//represents a function and it is similar to the connect func we use in our regular react redux lib.

// reduxForm()(StreamCreate) ---> Syntax meaning the reduxForm returns a function and we call that function by passing streamCreate.
//reduxForm --> unlike the connect func reduxForm takes in only one object

// reduxForm({
//   form:'streamCreate'
// })(StreamCreate);      -----> by hooking this redux form to our component we wil see lot of props getting received to
//our component

//-------------------------------------------------------------------------------------------------------------------

//<Field name="title" /> --->name is a mandatory prop for the Field
//The main purpose of the redux form is to make sure the the data is getting stored inside the state and tha date is
//is sent back to the component as props, but aht firls like input tag to checkbox ro dropdown that has tp be shown
//to the UI has to be decided and code has to be written for that.

//-----------------------------------------------------------------------------------------------------------------
// <input {...input}/> ---> The reason we need this deep level of refactoring is there are some other addiotional
//props as well whcih we need to care about in future, this will apply all the key value pairs present inside the
//input object as attributes for the input tag.

//---------------------------------------------------------------------------------------------------------------
//<Field name="title" component={this.renderInput} label="Enter Title"/> --> Here label is a customize prop, so if any
//such props is set to Field it does not know what to do so it sents them as prop to renderInput function

//----------------------------------------------------------------------------------------------------------------
//onSubmit={this.props.handleSubmit(this.onSubmit)} ---> we dont need to specifically say preventDefault(), redux form
//handles it.

//onSubmit is a call back function passed into another function as an argument, which is then invoked inside the
//outer function to complete some kind of routine or action.

//my understanding --> if a function has to recieve anything then that func has to be passed on as an argument to
//another outer function

//-----------------------------------------------------------------------------------------------------------------
//Regarding the validation

//Errors object is going to compare the key propert inside it with the name in the field tag and if that matches, then
//Field is going to get the value of the property and passes it to the render input function as "meta"
