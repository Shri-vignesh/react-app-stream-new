import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStream, deleteStream } from "../../actions/index";
import history from "../../history";
import Modal from "../Modal";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id); //this is called with id is because inside App.js in the
    //<Route path we gave delete/:id so is the reason
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      //When we are wrapping this <div> the style breaks off due to this extra div that goes inside the action class in
      //Modal component
      <React.Fragment>
        {/* <div> */}
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
        {/* </div> */}
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream";
    }
    return `Are you sure you want to delete the stream with title : ${this.props.stream.title}`;
  }

  render() {
    return (
      /* Even though the modal is rendered here somewhere deeply nested, since it is created using portal and made it to render
      under the body div element. It will be shown specifically in the UI */
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetchStream,
  deleteStream,
})(StreamDelete);

//------------------------------------------------------------------------------------------------------------------
//React.Fragment is kind of JSX looking element which helps to return multiple elements whcih when rendered on the screen
//does not produce any html.Its kind of invisible element whcih doent have any impact on DOM. it can also be used as
// <> </>. But sometimes they are few code quality checking tools which will thnk <></> as invalid syntax and might throw
//some erros so better go for <React.Fragment>
