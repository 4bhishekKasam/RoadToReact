import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withFirebase } from "../../firebase";

class HomePage extends Component {
  componentDidMount() {
    this.props.firebase.users().on("value", snap => {
      this.props.onSetUsers(snap.val());
      console.log(snap.val());
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.userState.users
  };
};

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: "USERS_SET", users })
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HomePage);
