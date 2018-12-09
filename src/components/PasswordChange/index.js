import React, { Component } from "react";
import { withFirebase } from "../../firebase";

const initialState = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value }, () => {
      console.log(this.state);
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...initialState });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="password"
          id="passwordOne"
          value={this.state.passwordOne}
          placeholder="Enter New Password"
          onChange={this.handleChange}
        />
        <br />
        <input
          type="password"
          id="passwordTwo"
          value={this.state.passwordTwo}
          placeholder="Confirm New Password"
          onChange={this.handleChange}
        />{" "}
        <br />
        <button disabled={isInvalid}> Sign In </button>
        <br />
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
