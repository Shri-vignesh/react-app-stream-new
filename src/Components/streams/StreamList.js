import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions/index";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList = () => {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`streams/${stream.id}`} className="header">{stream.title}</Link>
            <div className="descripiton">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams), //Here we convert the state which in object form to array for our convinent purpose so we use Object.values(state.streams)
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);

//--------------------------------------------------------------------------------------------------------------------------------

//this.renderList would only return a reference to the function itself. But you want its return value, so you have to execute
// it with the paraentheses to get the appropriate JSX.
//On things like the onClick= attribute however you need a reference to a function.

//My understanding --> You dont need to put paranthesis if you assign the function to any property like onClick or onSubmit or something
//like that
//------------------------------------------------------------------------------------------------------------------------------------
//Object.values is a built in JS function which takes obj as argument, all the values inside the object will be pulled out and inseretd into the array.

//--------------------------------------------------------------------------------------------------------------------------------------
//QN) Why dont we always use a arrow function over the noraml function?
//Looks like due to some performance avoiding issue...but need to deep dive more into it.

//--------------------------------------------------------------------------------------------------------------------------------------
//lets say the url is /streams/edit/:id --> here this part with ':id' is a variable since it has a colon in it
//------------------------------------------------------------------------------------------------------------
//Now the user navigates to when Edit button is clicked and URL lets say looks like this '/streams/edit/3',
//the stream edit page will be rendered but how do we fetch the id 3 from the url? so basically what happens
//is since the Stream Edit component is being rendered by the <Route> which is provided by the
//react-router-dom (in App.js file), it send out a set of props to the components by default from where
//we can fetch the id.
