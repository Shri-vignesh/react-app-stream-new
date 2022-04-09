import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError = ({ error, touched }) => {
    if (error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  //Whenever renderInput method gets called the Field tag is going to pass in with couple of props automatically
  //  which we receive them in the name of formProps(which has been refactores as input object now.
  renderInput = ({ input, label, meta }) => {
    return (
      // <input
      //   value={formProps.input.value}
      //   onChange={formProps.input.onChange}
      // />

      //refactored-code as above
      // <input {...formProps.input} />

      //further refactored-code
      <div className="field">
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {/* <div>{meta.error}</div> */}
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    console.log('form values for new',formValues)
    this.props.onSubmit(formValues)
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error" //if we dont add the classname "error", the error messages wont get displayed
      >   
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button class="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  let errors = {};

  if (!formValues.title) {
    errors.title = "You must Enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({
  form: "streamCreate",
  validate: validate,
})(StreamForm);

//----------------------------------------------------------------------------------------------------------
//We dont need this since we are trying to make a common stream form component
// export default connect(null, {
//   createStream
// })(formWrapped)

//-----------------------------------------------------------------------------------------------------------
//Here, in this component while we are exporting the STramForm we are wrapping it with reduxForm which gives
//a special felxibility to send some props from the parent component to this form. While we send props first we
//send the props to redux form which inturn sends to this component.

//Ex -> we can send a prop named 'intialValues' to this form.

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

//---------------------------------------------------------------------------------------------------------